"""Live Indian market data service (NSE/BSE-capable scaffold).

Primary source: Yahoo Finance quote API for broad symbol coverage in batches.
Universe source: NSE security master (EQUITY_L.csv).

Notes:
- Designed to cover all market-cap buckets by fetching the complete tradable list.
- In production, add paid low-latency feeds and Redis backing for horizontal scaling.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
import math
import time
from zoneinfo import ZoneInfo
from typing import Any

import json
from urllib.parse import urlencode
from urllib.request import urlopen

IST = ZoneInfo("Asia/Kolkata")


@dataclass
class RefreshStats:
  symbols_total: int
  symbols_fetched: int
  batches: int
  elapsed_seconds: float
  source: str
  as_of_ist: str


class LiveIndiaMarketDataService:
  NSE_MASTER_URL = "https://archives.nseindia.com/content/equities/EQUITY_L.csv"
  YAHOO_QUOTE_URL = "https://query1.finance.yahoo.com/v7/finance/quote"
  FALLBACK_SYMBOLS = ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK", "SBIN", "TATASTEEL"]

  def __init__(self, batch_size: int = 200, timeout_seconds: int = 20) -> None:
    self.batch_size = batch_size
    self.timeout_seconds = timeout_seconds
    self._symbols: list[str] = []
    self._quotes_by_symbol: dict[str, dict[str, Any]] = {}
    self._last_refresh: RefreshStats | None = None
    self._last_refresh_used_fallback = False

  @staticmethod
  def _as_of_ist() -> str:
    return datetime.now(IST).strftime("%Y-%m-%d %H:%M:%S IST")

  @staticmethod
  def is_market_hours() -> bool:
    now = datetime.now(IST)
    if now.weekday() >= 5:
      return False
    open_minutes = 9 * 60 + 15
    close_minutes = 15 * 60 + 30
    current_minutes = now.hour * 60 + now.minute
    return open_minutes <= current_minutes <= close_minutes

  def _fetch_nse_symbol_universe(self) -> list[str]:
    with urlopen(self.NSE_MASTER_URL, timeout=self.timeout_seconds) as resp:
      body = resp.read().decode('utf-8', errors='ignore')
    lines = body.splitlines()
    if not lines:
      return []
    header = [h.strip().upper() for h in lines[0].split(",")]
    try:
      symbol_idx = header.index("SYMBOL")
    except ValueError:
      return []

    symbols: list[str] = []
    for line in lines[1:]:
      cols = [c.strip().strip('"') for c in line.split(",")]
      if symbol_idx < len(cols):
        sym = cols[symbol_idx]
        if sym:
          symbols.append(sym)
    return sorted(set(symbols))

  def _chunks(self, items: list[str]) -> list[list[str]]:
    return [items[i:i + self.batch_size] for i in range(0, len(items), self.batch_size)]

  def _fetch_quote_batch(self, yahoo_symbols: list[str]) -> list[dict[str, Any]]:
    params = urlencode({'symbols': ','.join(yahoo_symbols)})
    url = f"{self.YAHOO_QUOTE_URL}?{params}"
    with urlopen(url, timeout=self.timeout_seconds) as resp:
      payload = json.loads(resp.read().decode('utf-8', errors='ignore'))
    return payload.get("quoteResponse", {}).get("result", [])

  @staticmethod
  def _normalize_quote(item: dict[str, Any]) -> dict[str, Any]:
    symbol = item.get("symbol", "")
    root = symbol.replace(".NS", "").replace(".BO", "")
    return {
      "symbol": root,
      "exchange_symbol": symbol,
      "price": item.get("regularMarketPrice"),
      "day_change": item.get("regularMarketChange"),
      "day_change_pct": item.get("regularMarketChangePercent"),
      "day_volume": item.get("regularMarketVolume"),
      "market_cap": item.get("marketCap"),
      "currency": item.get("currency", "INR"),
      "market_state": item.get("marketState"),
      "as_of_ist": LiveIndiaMarketDataService._as_of_ist(),
    }

  def _build_fallback_quote(self, symbol: str, idx: int) -> dict[str, Any]:
    base = 100 + (idx * 7)
    return {
      "symbol": symbol,
      "exchange_symbol": f"{symbol}.NS",
      "price": float(base),
      "day_change": 0.0,
      "day_change_pct": 0.0,
      "day_volume": 0,
      "market_cap": None,
      "currency": "INR",
      "market_state": "CLOSED",
      "as_of_ist": self._as_of_ist(),
      "is_fallback": True,
    }

  def refresh_all(self) -> RefreshStats:
    start = time.perf_counter()
    if not self._symbols:
      try:
        self._symbols = self._fetch_nse_symbol_universe()
      except Exception:
        self._symbols = list(self.FALLBACK_SYMBOLS)

    yahoo_symbols = [f"{sym}.NS" for sym in self._symbols]
    batches = self._chunks(yahoo_symbols)
    quotes_fetched = 0
    fallback_used = False

    for batch in batches:
      try:
        rows = self._fetch_quote_batch(batch)
      except Exception:
        continue
      for row in rows:
        normalized = self._normalize_quote(row)
        self._quotes_by_symbol[normalized["symbol"]] = normalized
        quotes_fetched += 1

    if quotes_fetched == 0:
      for idx, sym in enumerate(self._symbols):
        self._quotes_by_symbol[sym] = self._build_fallback_quote(sym, idx)
      quotes_fetched = len(self._symbols)
      fallback_used = True

    elapsed = time.perf_counter() - start
    self._last_refresh = RefreshStats(
      symbols_total=len(self._symbols),
      symbols_fetched=quotes_fetched,
      batches=math.ceil(len(yahoo_symbols) / self.batch_size) if yahoo_symbols else 0,
      elapsed_seconds=round(elapsed, 2),
      source="nse_master + yahoo_quote",
      as_of_ist=self._as_of_ist(),
    )
    self._last_refresh_used_fallback = fallback_used
    return self._last_refresh

  def list_quotes(self, limit: int = 200, offset: int = 0) -> list[dict[str, Any]]:
    items = list(self._quotes_by_symbol.values())
    end = max(offset, 0) + max(limit, 0)
    return items[max(offset, 0):end]

  def get_quote(self, symbol: str) -> dict[str, Any] | None:
    return self._quotes_by_symbol.get(symbol.upper())

  def status(self) -> dict[str, Any]:
    return {
      "market_hours": self.is_market_hours(),
      "tracked_symbols": len(self._symbols),
      "cached_quotes": len(self._quotes_by_symbol),
      "last_refresh": self._last_refresh.__dict__ if self._last_refresh else None,
      "as_of_ist": self._as_of_ist(),
      "degraded_mode": ((self._last_refresh_used_fallback or self._last_refresh.symbols_fetched < self._last_refresh.symbols_total) if self._last_refresh else None),
    }
