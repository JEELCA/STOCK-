"""Breakout detection engine scaffold for stocks and commodities."""

from __future__ import annotations

from dataclasses import dataclass
import pandas as pd


@dataclass
class BreakoutSignal:
  ticker: str
  breakout_type: str
  breakout_date: str
  breakout_price: float
  trigger_volume: float
  avg_volume_20d: float
  volume_ratio: float
  prior_consolidation_days: int
  target_r1: float
  target_r2: float
  stop_loss: float
  confidence_score: float
  connected_trigger: str
  timeframe: str


def detect_donchian_breakout(df: pd.DataFrame, channel_days: int = 20) -> list[BreakoutSignal]:
  """Detect close > Donchian upper channel with volume confirmation."""
  if df.empty:
    return []
  # TODO: implement Donchian 20D and 52W variants.
  return []


def detect_all_breakouts(df: pd.DataFrame) -> list[BreakoutSignal]:
  """Run all requested breakout families and aggregate results."""
  signals = []
  signals.extend(detect_donchian_breakout(df, channel_days=20))
  return signals
