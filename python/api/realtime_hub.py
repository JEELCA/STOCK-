"""Realtime market data hub for Stock Universe India.

This module centralizes in-memory subscriptions and broadcast helpers.
Production deployment should replace in-memory fanout with Redis pub/sub.
"""

from __future__ import annotations

import asyncio
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from typing import Any


@dataclass
class PriceTick:
  symbol: str
  ltp: float
  change_pct: float
  volume: int
  as_of_ist: str


class RealtimeHub:
  def __init__(self) -> None:
    self._channels: dict[str, set[asyncio.Queue]] = defaultdict(set)

  def subscribe(self, channel: str) -> asyncio.Queue:
    queue: asyncio.Queue = asyncio.Queue(maxsize=256)
    self._channels[channel].add(queue)
    return queue

  def unsubscribe(self, channel: str, queue: asyncio.Queue) -> None:
    if channel in self._channels:
      self._channels[channel].discard(queue)

  async def publish(self, channel: str, payload: dict[str, Any]) -> None:
    stale_queues: list[asyncio.Queue] = []
    for queue in self._channels.get(channel, set()):
      if queue.full():
        stale_queues.append(queue)
        continue
      await queue.put(payload)
    for queue in stale_queues:
      self._channels[channel].discard(queue)


def build_mock_tick(symbol: str, ltp: float) -> dict[str, Any]:
  """Build minimal tick payload used in early integration tests."""
  return {
    "symbol": symbol,
    "ltp": ltp,
    "change_pct": 0.0,
    "volume": 0,
    "as_of_ist": datetime.now().strftime("%Y-%m-%d %H:%M:%S IST"),
  }
