"""FastAPI backend scaffold for Stock Universe India.

Realtime and REST API surfaces for the connecting-the-dots platform.
All response payloads currently come from local mock providers and must be
wired to Postgres/Timescale, Neo4j, Redis, and production data fetchers.
"""

from __future__ import annotations

import asyncio
from datetime import datetime
from typing import Literal

from fastapi import FastAPI, Query, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, Field

from python.api.realtime_hub import RealtimeHub, build_mock_tick
from python.api.live_data_service import LiveIndiaMarketDataService
from python.api.sample_data import (
  TIMEFRAMES,
  as_of_ist,
  best_performer_rows,
  breakout_rows,
  graph_payload,
  stock_details,
  domain_taxonomy,
  potential_breakout_categories,
  potential_breakout_rows,
)

Timeframe = Literal['1D', '1W', '1M', '3M', '6M', '1Y']
EntityType = Literal['stock', 'sector', 'commodity']


class AlertCreateRequest(BaseModel):
  symbol: str = Field(..., description='NSE/BSE symbol')
  alert_type: str = Field(..., description='PRICE|CORRELATION_SHIFT|BREAKOUT|EVENT')
  condition: str
  threshold: float | None = None


class WatchlistRequest(BaseModel):
  symbol: str


app = FastAPI(title='Stock Universe India API', version='0.3.0')
hub = RealtimeHub()
live_service = LiveIndiaMarketDataService()


@app.get('/health')
def health() -> dict:
  return {
    'ok': True,
    'service': 'stock-universe-india-api',
    'market': 'NSE+BSE',
    'as_of_ist': as_of_ist(),
  }




@app.get('/api/live/status')
def live_status() -> dict:
  return live_service.status()


@app.post('/api/live/refresh')
def live_refresh() -> dict:
  stats = live_service.refresh_all()
  return {'refreshed': True, 'stats': stats.__dict__}


@app.get('/api/live/stocks')
def live_stocks(limit: int = 200, offset: int = 0) -> dict:
  return {
    'items': live_service.list_quotes(limit=limit, offset=offset),
    'limit': limit,
    'offset': offset,
    'status': live_service.status(),
  }


@app.get('/api/live/stocks/{symbol}')
def live_stock(symbol: str) -> dict:
  row = live_service.get_quote(symbol)
  return {'item': row, 'found': row is not None, 'as_of_ist': as_of_ist()}

@app.get('/api/stocks')
def list_stocks(page: int = 1, limit: int = 50, sector: str | None = None) -> dict:
  items = [stock_details(symbol) for symbol in ['RELIANCE', 'TCS', 'HDFCBANK', 'HAL', 'DIXON']]
  if sector:
    items = [item for item in items if item.get('sector', '').lower() == sector.lower()]
  start = max((page - 1) * limit, 0)
  end = start + limit
  return {'page': page, 'limit': limit, 'sector': sector, 'items': items[start:end], 'as_of_ist': as_of_ist()}


@app.get('/api/stocks/{symbol}')
def stock_detail(symbol: str) -> dict:
  return stock_details(symbol)


@app.get('/api/stocks/{symbol}/prices')
def stock_prices(symbol: str, tf: str = '1Y') -> dict:
  return {'symbol': symbol.upper(), 'timeframe': tf, 'ohlcv': [], 'as_of_ist': as_of_ist()}


@app.get('/api/stocks/{symbol}/fundamentals')
def stock_fundamentals(symbol: str) -> dict:
  return {'symbol': symbol.upper(), 'financials': [], 'as_of_ist': as_of_ist()}


@app.get('/api/stocks/{symbol}/connections')
def stock_connections(symbol: str, tf: Timeframe = '1M') -> dict:
  details = stock_details(symbol)
  return {'symbol': symbol.upper(), 'timeframe': tf, 'connections': details.get('connections', []), 'as_of_ist': as_of_ist()}


@app.get('/api/stocks/{symbol}/narrative')
def stock_narrative(symbol: str) -> dict:
  return {
    'symbol': symbol.upper(),
    'narrative': 'AI-generated analysis. Not investment advice.',
    'framework': ['Global Macro', 'India Macro', 'Sector', 'Company', 'Price Action'],
    'as_of_ist': as_of_ist(),
  }


@app.get('/api/stocks/{symbol}/breakouts')
def stock_breakouts(symbol: str, tf: Timeframe = '1W') -> dict:
  rows = [row for row in breakout_rows('stock', tf) if row['entity_symbol'] == symbol.upper()]
  return {'symbol': symbol.upper(), 'timeframe': tf, 'items': rows, 'as_of_ist': as_of_ist()}


@app.get('/api/sectors')
def sectors(tf: Timeframe = '1M') -> dict:
  return {'timeframe': tf, 'items': best_performer_rows('sector', tf), 'as_of_ist': as_of_ist()}


@app.get('/api/sectors/{name}')
def sector_detail(name: str, tf: Timeframe = '1M') -> dict:
  return {'name': name, 'timeframe': tf, 'metrics': {}, 'as_of_ist': as_of_ist()}


@app.get('/api/sectors/{name}/stocks')
def sector_stocks(name: str, tf: Timeframe = '1M') -> dict:
  rows = [row for row in best_performer_rows('stock', tf) if row.get('sector', '').lower() == name.lower()]
  return {'sector': name, 'timeframe': tf, 'items': rows, 'as_of_ist': as_of_ist()}


@app.get('/api/commodities')
def commodities(tf: Timeframe = '1M') -> dict:
  return {'timeframe': tf, 'items': best_performer_rows('commodity', tf), 'as_of_ist': as_of_ist()}


@app.get('/api/commodities/breakouts')
def commodity_breakouts(tf: Timeframe = '1W') -> dict:
  return {'timeframe': tf, 'items': breakout_rows('commodity', tf), 'as_of_ist': as_of_ist()}


@app.get('/api/commodities/{name}/prices')
def commodity_prices(name: str, tf: Timeframe = '1Y') -> dict:
  return {'commodity': name, 'timeframe': tf, 'ohlcv': [], 'as_of_ist': as_of_ist()}


@app.get('/api/commodities/{name}/linked-stocks')
def commodity_linked_stocks(name: str, tf: Timeframe = '3M') -> dict:
  return {'commodity': name, 'timeframe': tf, 'items': best_performer_rows('stock', tf)[:10], 'as_of_ist': as_of_ist()}


@app.get('/api/macro/india')
def macro_india() -> dict:
  return {'country': 'IN', 'indicators': [], 'as_of_ist': as_of_ist()}


@app.get('/api/macro/global')
def macro_global() -> dict:
  return {'scope': 'global', 'indicators': [], 'as_of_ist': as_of_ist()}


@app.get('/api/macro/regime')
def macro_regime() -> dict:
  return {'regime': 'BULL', 'confidence': 0.62, 'as_of_ist': as_of_ist()}


@app.get('/api/best-performers')
def best_performers(entity_type: EntityType = Query(default='stock', alias='type'), tf: Timeframe = '1M') -> dict:
  return {'type': entity_type, 'timeframe': tf, 'supported_timeframes': TIMEFRAMES, 'items': best_performer_rows(entity_type, tf), 'as_of_ist': as_of_ist()}


@app.get('/api/breakouts')
def breakouts(entity_type: EntityType = Query(default='stock', alias='type'), tf: Timeframe = '1W') -> dict:
  return {'type': entity_type, 'timeframe': tf, 'supported_timeframes': TIMEFRAMES, 'items': breakout_rows(entity_type, tf), 'as_of_ist': as_of_ist()}


@app.get('/api/breakouts/potential')
def potential_breakouts(tf: Timeframe = '1W') -> dict:
  return {
    'timeframe': tf,
    'supported_timeframes': TIMEFRAMES,
    'items': breakout_rows('stock', tf),
    'rule': 'Every breakout includes a because_of reason chain.',
    'as_of_ist': as_of_ist(),
  }


@app.get('/api/breakouts/potential/categories')
def potential_breakouts_by_category(tf: Timeframe = '1W') -> dict:
  return potential_breakout_categories(tf)


@app.get('/api/rankings/stocks')
def stock_rankings(tf: Timeframe = '1M', market_cap: str = 'All', sector: str = 'All') -> dict:
  rows = best_performer_rows('stock', tf)
  if market_cap != 'All':
    rows = [r for r in rows if r.get('market_cap_category', '').lower() == market_cap.lower()]
  if sector != 'All':
    rows = [r for r in rows if r.get('sector', '').lower() == sector.lower()]
  return {'timeframe': tf, 'market_cap': market_cap, 'sector': sector, 'columns': domain_taxonomy().get('stock_ranking_columns', []), 'items': rows, 'as_of_ist': as_of_ist()}


@app.get('/api/rankings/sectors')
def sector_rankings(tf: Timeframe = '1M') -> dict:
  return {'timeframe': tf, 'columns': domain_taxonomy().get('sector_ranking_columns', []), 'items': best_performer_rows('sector', tf), 'as_of_ist': as_of_ist()}


@app.get('/api/rankings/commodities/breakouts')
def commodity_breakout_rankings(tf: Timeframe = '1M') -> dict:
  return {'timeframe': tf, 'items': best_performer_rows('commodity', tf), 'as_of_ist': as_of_ist()}


@app.get('/api/graph/full')
def full_graph() -> dict:
  return graph_payload()


@app.get('/api/graph/neighborhood/{node_id}')
def graph_neighborhood(node_id: str, depth: int = 2) -> dict:
  graph = graph_payload()
  edges = [edge for edge in graph['edges'] if edge['source'] == node_id or edge['target'] == node_id]
  return {'node_id': node_id, 'depth': depth, 'edges': edges, 'nodes': graph['nodes'], 'as_of_ist': as_of_ist()}


@app.get('/api/graph/path/{from_node}/{to_node}')
def graph_path(from_node: str, to_node: str) -> dict:
  return {'from': from_node, 'to': to_node, 'path': [from_node, 'USD/INR', to_node], 'as_of_ist': as_of_ist()}


@app.get('/api/graph/visual-config')
def graph_visual_config() -> dict:
  return {'config': domain_taxonomy().get('graph_visual_config', {}), 'as_of_ist': as_of_ist()}


@app.get('/api/graph/communities')
def graph_communities() -> dict:
  return {
    'algorithm': 'louvain',
    'items': [
      {'community_id': 1, 'nodes': ['RELIANCE', 'IOC', 'BPCL']},
      {'community_id': 2, 'nodes': ['TCS', 'INFY']},
    ],
    'as_of_ist': as_of_ist(),
  }


@app.get('/api/correlations/{symbol}')
def symbol_correlations(symbol: str, tf: Timeframe = '3M') -> dict:
  return {'symbol': symbol.upper(), 'timeframe': tf, 'items': [], 'as_of_ist': as_of_ist()}


@app.get('/api/correlations/matrix')
def correlation_matrix(sector: str = 'Metal', tf: Timeframe = '3M') -> dict:
  return {'sector': sector, 'timeframe': tf, 'matrix': [], 'as_of_ist': as_of_ist()}


@app.get('/api/geopolitics')
def geopolitics() -> dict:
  return {'items': [], 'as_of_ist': as_of_ist()}


@app.get('/api/geopolitics/{event_id}/impact')
def geopolitics_impact(event_id: int) -> dict:
  return {'event_id': event_id, 'impact': {}, 'as_of_ist': as_of_ist()}


@app.get('/api/screener')
def screener(filters: str = '{}') -> dict:
  return {'filters': filters, 'items': [], 'as_of_ist': as_of_ist()}


@app.get('/api/strategies')
def strategies() -> dict:
  return {
    'items': [
      {'name': 'Weak Rupee Basket', 'symbols': ['TCS', 'INFY', 'SUNPHARMA']},
      {'name': 'Infra Capex Play', 'symbols': ['LT', 'RVNL', 'IRCON']},
    ],
    'as_of_ist': as_of_ist(),
  }




@app.get('/api/domain/taxonomy')
def domain_taxonomy_endpoint() -> dict:
  return domain_taxonomy()



@app.get('/api/connections/pathfinder')
def connections_pathfinder(from_entity: str, to_entity: str) -> dict:
  return {
    'from': from_entity,
    'to': to_entity,
    'shortest_path': [from_entity, 'Steel Prices', 'China PMI', 'Global Risk Appetite', to_entity],
    'all_paths': [[from_entity, 'Steel Prices', to_entity]],
    'as_of_ist': as_of_ist(),
  }


@app.get('/api/connections/strength-tracker')
def connection_strength_tracker(entity_a: str, entity_b: str, tf: Timeframe = '3M') -> dict:
  return {
    'entity_a': entity_a,
    'entity_b': entity_b,
    'timeframe': tf,
    'rolling_correlation': [
      {'date': '2026-01-10', 'value': 0.31},
      {'date': '2026-01-20', 'value': 0.44},
      {'date': '2026-01-30', 'value': 0.58},
    ],
    'as_of_ist': as_of_ist(),
  }


@app.get('/api/connections/network-stats')
def connection_network_stats() -> dict:
  return {
    'most_connected': ['RELIANCE', 'HDFCBANK', 'TATASTEEL'],
    'highest_pagerank': ['RELIANCE', 'TCS', 'HDFCBANK'],
    'highest_betweenness': ['L&T', 'RELIANCE'],
    'as_of_ist': as_of_ist(),
  }


@app.get('/api/market/breadth')
def market_breadth() -> dict:
  return {
    'advance_decline_ratio': 1.42,
    'new_52w_highs': 96,
    'new_52w_lows': 24,
    'pct_above_50dma': 62,
    'pct_above_200dma': 54,
    'india_vix': 13.5,
    'put_call_ratio': 1.02,
    'as_of_ist': as_of_ist(),
  }


@app.get('/api/pulse/daily')
def daily_pulse() -> dict:
  return {
    'headline': 'Risk-on bias with commodity-led sector momentum',
    'summary': 'GST strength, FII buying return, and metals breakout are shaping current tape.',
    'generated_at': as_of_ist(),
  }


@app.get('/api/breakouts/potential/top')
def potential_breakouts_top(tf: Timeframe = '1W', limit: int = 10) -> dict:
  rows = potential_breakout_rows(tf)
  return {'timeframe': tf, 'items': rows[:limit], 'as_of_ist': as_of_ist()}


@app.get('/api/search')
def search(q: str) -> dict:
  items = [stock for stock in ['RELIANCE', 'TCS', 'HDFCBANK', 'HAL', 'DIXON'] if q.upper() in stock]
  return {'query': q, 'items': items, 'as_of_ist': as_of_ist()}


@app.post('/api/alerts')
def create_alert(payload: AlertCreateRequest) -> dict:
  return {'created': True, 'alert': payload.model_dump(), 'as_of_ist': as_of_ist()}


@app.get('/api/alerts')
def list_alerts() -> dict:
  return {'items': [], 'as_of_ist': as_of_ist()}


@app.post('/api/watchlist')
def add_watchlist(payload: WatchlistRequest) -> dict:
  return {'added': True, 'symbol': payload.symbol.upper(), 'as_of_ist': as_of_ist()}


@app.get('/api/watchlist')
def get_watchlist() -> dict:
  return {'items': ['RELIANCE', 'TCS'], 'as_of_ist': as_of_ist()}


@app.websocket('/ws/prices')
async def prices_socket(ws: WebSocket) -> None:
  await ws.accept()
  queue = hub.subscribe('prices')
  try:
    await ws.send_json({'message': 'connected', 'channel': 'prices', 'as_of_ist': as_of_ist()})
    while True:
      payload = await queue.get()
      await ws.send_json(payload)
  except WebSocketDisconnect:
    hub.unsubscribe('prices', queue)


@app.websocket('/ws/alerts')
async def alerts_socket(ws: WebSocket) -> None:
  await ws.accept()
  queue = hub.subscribe('alerts')
  try:
    await ws.send_json({'message': 'connected', 'channel': 'alerts', 'as_of_ist': as_of_ist()})
    while True:
      payload = await queue.get()
      await ws.send_json(payload)
  except WebSocketDisconnect:
    hub.unsubscribe('alerts', queue)


@app.on_event('startup')
async def startup_feed_simulator() -> None:
  async def _mock_feed() -> None:
    symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'HAL', 'DIXON']
    price = 1000.0
    while True:
      for symbol in symbols:
        price += 0.5
        await hub.publish('prices', build_mock_tick(symbol, round(price, 2)))
      await asyncio.sleep(1.0)

  asyncio.create_task(_mock_feed())


@app.on_event('startup')
async def startup_alert_simulator() -> None:
  async def _alerts() -> None:
    while True:
      await hub.publish(
        'alerts',
        {
          'type': 'CONNECTION_SHIFT',
          'message': 'Correlation shift detected between Copper and HINDALCO (>0.2 delta)',
          'severity': 'INFO',
          'as_of_ist': datetime.now().strftime('%Y-%m-%d %H:%M:%S IST'),
        },
      )
      await asyncio.sleep(30)

  asyncio.create_task(_alerts())



@app.on_event('startup')
async def startup_live_market_refresher() -> None:
  async def _refresh_loop() -> None:
    while True:
      try:
        if live_service.is_market_hours():
          stats = live_service.refresh_all()
          await hub.publish('prices', {
            'type': 'LIVE_REFRESH',
            'symbols_total': stats.symbols_total,
            'symbols_fetched': stats.symbols_fetched,
            'as_of_ist': stats.as_of_ist,
          })
      except Exception as exc:
        await hub.publish('alerts', {
          'type': 'LIVE_REFRESH_ERROR',
          'message': f'Live refresh failed: {exc}',
          'severity': 'WARN',
          'as_of_ist': as_of_ist(),
        })
      await asyncio.sleep(60)

  asyncio.create_task(_refresh_loop())
