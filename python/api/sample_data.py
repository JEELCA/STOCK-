"""Mock data providers for Stock Universe India API development.

This module provides deterministic payloads for UI/API integration and
captures target data contracts before production DB + live feed wiring.
"""

from __future__ import annotations

from datetime import datetime

TIMEFRAMES = ("1D", "1W", "1M", "3M", "6M", "1Y")

STOCK_RANKING_COLUMNS = [
  'rank', 'symbol', 'sector', 'price', 'return_pct', 'volume_ratio', 'delivery_pct', 'rsi_14',
  'distance_from_52w_high_pct', 'market_cap_category', 'fii_holding_change_qoq',
]

SECTOR_RANKING_COLUMNS = [
  'rank', 'sector', 'return_pct', 'breadth_positive_pct', 'pct_above_50dma', 'pct_above_200dma',
  'advance_decline_ratio', 'best_stock', 'worst_stock', 'rs_vs_nifty50',
]

BREAKOUT_CATEGORIES = [
  'commodity_moves', 'currency_moves', 'government_policy', 'geopolitical_events',
  'technical_setups', 'earnings_momentum', 'sector_rotation', 'seasonal_patterns',
  'supply_demand_shift', 'institutional_activity', 'global_cues',
]

SECTORS_TRACKED = [
  'Nifty 50', 'Nifty Bank', 'Nifty Private Bank', 'Nifty PSU Bank', 'Nifty IT',
  'Nifty Pharma', 'Nifty Healthcare', 'Nifty Auto', 'Nifty Metal', 'Nifty Realty',
  'Nifty Energy', 'Nifty Oil & Gas', 'Nifty FMCG', 'Nifty Consumer Durables',
  'Nifty Infrastructure', 'Nifty Financial Services', 'Nifty Financial Services 25/50',
  'Nifty Media', 'Nifty PSE', 'Nifty MNC', 'Nifty Commodities',
  'Nifty India Defence', 'Nifty India Digital', 'Nifty EV & New Energy',
  'Nifty Ethanol', 'Nifty Data Center & Cloud', 'Nifty Semiconductor & Electronics',
  'Nifty Chemicals', 'Nifty Textiles', 'Nifty Capital Goods', 'Nifty CPSE',
  'Nifty Midcap 150', 'Nifty Smallcap 250', 'Nifty Microcap 250',
]

STOCKS = [
  {'symbol': 'COCHINSHIP', 'name': 'Cochin Shipyard', 'sector': 'Nifty India Defence', 'price': 1245.0, 'market_cap_category': 'Mid'},
  {'symbol': 'IRFC', 'name': 'Indian Railway Finance Corp', 'sector': 'Nifty Infrastructure', 'price': 168.0, 'market_cap_category': 'Mid'},
  {'symbol': 'TATASTEEL', 'name': 'Tata Steel', 'sector': 'Nifty Metal', 'price': 142.5, 'market_cap_category': 'Large'},
  {'symbol': 'DIXON', 'name': 'Dixon Technologies', 'sector': 'Nifty Semiconductor & Electronics', 'price': 5280.0, 'market_cap_category': 'Mid'},
  {'symbol': 'HDFCBANK', 'name': 'HDFC Bank', 'sector': 'Nifty Bank', 'price': 1615.0, 'market_cap_category': 'Large'},
]


def as_of_ist() -> str:
  return datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')


def stock_details(symbol: str) -> dict:
  upper = symbol.upper()
  base = next((row for row in STOCKS if row['symbol'] == upper), {'symbol': upper, 'name': upper, 'sector': 'Unknown', 'price': 0.0, 'market_cap_category': 'Unknown'})
  return {
    **base,
    'day_change_pct': 2.3,
    'day_volume': 45000000,
    'avg_volume_20d': 18000000,
    'week_52_high': 155.8,
    'week_52_low': 104.2,
    'momentum_score': 78,
    'quality_score': 65,
    'growth_score': 72,
    'value_score': 58,
    'breakout_probability': 0.73,
    'connection_count': 47,
    'systemic_importance': 0.85,
    'connections': [
      {'entity': 'Crude Oil Brent', 'type': 'Commodity', 'relationship': 'USES_RAW_MATERIAL', 'strength': 0.78, 'direction': 'NEGATIVE'},
      {'entity': 'USD/INR', 'type': 'Currency', 'relationship': 'REVENUE_EXPOSED_TO', 'strength': 0.63, 'direction': 'POSITIVE'},
      {'entity': 'PLI Electronics', 'type': 'GovernmentPolicy', 'relationship': 'BENEFITS_FROM', 'strength': 0.71, 'direction': 'POSITIVE'},
    ],
    'as_of_ist': as_of_ist(),
  }


def best_stock_rows(tf: str) -> list[dict]:
  return [
    {
      'rank': idx + 1,
      'symbol': row['symbol'],
      'sector': row['sector'],
      'price': row['price'],
      'return_pct': round(45.2 - (idx * 2.4), 2),
      'volume_ratio': round(3.5 - (idx * 0.3), 2),
      'delivery_pct': max(50, 72 - (idx * 4)),
      'rsi_14': max(52, 78 - (idx * 3)),
      'distance_from_52w_high_pct': round(2.8 + idx, 2),
      'market_cap_category': row['market_cap_category'],
      'fii_holding_change_qoq': round(1.2 - (idx * 0.15), 2),
      'timeframe': tf,
      'as_of_ist': as_of_ist(),
    }
    for idx, row in enumerate(STOCKS)
  ]


def best_sector_rows(tf: str) -> list[dict]:
  return [
    {
      'rank': 1,
      'sector': 'Nifty India Defence',
      'return_pct': 15.3,
      'breadth_positive_pct': 90,
      'pct_above_50dma': 85,
      'pct_above_200dma': 79,
      'advance_decline_ratio': 2.8,
      'best_stock': 'COCHINSHIP',
      'worst_stock': 'BDL',
      'rs_vs_nifty50': 1.22,
      'timeframe': tf,
    },
    {
      'rank': 2,
      'sector': 'Nifty Metal',
      'return_pct': 12.1,
      'breadth_positive_pct': 80,
      'pct_above_50dma': 73,
      'pct_above_200dma': 60,
      'advance_decline_ratio': 2.5,
      'best_stock': 'TATASTEEL',
      'worst_stock': 'NATIONALUM',
      'rs_vs_nifty50': 1.15,
      'timeframe': tf,
    },
  ]


def commodity_breakout_rows(tf: str) -> list[dict]:
  return [
    {
      'rank': 1,
      'commodity': 'Gold',
      'price': '$2,050',
      'change_pct': 8.5,
      'breakout_type': 'All-Time High',
      'impact_on_stocks': '↑ Titan, Kalyan, Muthoot',
      'timeframe': tf,
    },
    {
      'rank': 2,
      'commodity': 'Copper',
      'price': '$8,800',
      'change_pct': 12.3,
      'breakout_type': '52W High + Vol',
      'impact_on_stocks': '↑ Hindalco ↓ Polycab, KEI',
      'timeframe': tf,
    },
  ]


def potential_breakout_rows(tf: str) -> list[dict]:
  return [
    {
      'rank': 1,
      'symbol': 'TATASTEEL',
      'sector': 'Metal',
      'price': 142.5,
      'breakout_probability': 0.73,
      'top_reason': 'BB squeeze + copper breakout + sector momentum',
      'expected_direction': 'UP',
      'expected_magnitude_pct': 7.2,
      'confidence_interval': [4.5, 12.0],
      'time_horizon': '5 trading days',
      'top_contributing_features': [
        {'feature': 'BB_squeeze_percentile', 'contribution': 0.15, 'value': 95},
        {'feature': 'sector_momentum', 'contribution': 0.12, 'value': 8.5},
      ],
      'key_resistance_levels': [148.5, 155.8],
      'stop_loss_suggestion': 135.0,
      'nearest_support': 138.2,
      'timeframe': tf,
    },
    {
      'rank': 2,
      'symbol': 'DIXON',
      'sector': 'Electronics',
      'price': 5280,
      'breakout_probability': 0.71,
      'top_reason': 'PLI incentive + volume buildup + earnings momentum',
      'expected_direction': 'UP',
      'expected_magnitude_pct': 6.8,
      'confidence_interval': [4.2, 10.5],
      'time_horizon': '5 trading days',
      'top_contributing_features': [
        {'feature': 'delivery_volume_ratio', 'contribution': 0.11, 'value': 2.3},
        {'feature': 'policy_signal', 'contribution': 0.1, 'value': 1},
      ],
      'key_resistance_levels': [5400, 5580],
      'stop_loss_suggestion': 5050,
      'nearest_support': 5120,
      'timeframe': tf,
    },
  ]


def potential_breakout_categories(tf: str) -> dict:
  return {
    'commodity_moves': [
      {'stock': 'HINDALCO', 'commodity': 'Copper', 'commodity_move': '+9.1%', 'expected_stock_impact': 'POSITIVE'},
    ],
    'currency_moves': [
      {'stock': 'TCS', 'currency_signal': 'INR weakening past 83.50', 'expected_stock_impact': 'POSITIVE'},
    ],
    'government_policy': [
      {'stock': 'DIXON', 'policy': 'PLI Semiconductor', 'reason': 'direct beneficiary'},
    ],
    'geopolitical_events': [
      {'stock': 'HAL', 'event': 'Regional conflict escalation', 'reason': 'defence order sentiment'},
    ],
    'technical_setups': [
      {'stock': 'RELIANCE', 'setup': 'Cup & Handle', 'trigger': 'Break above 2650'},
    ],
    'earnings_momentum': [
      {'stock': 'KAYNES', 'reason': '3 consecutive quarters >50% revenue growth'},
    ],
    'sector_rotation': [
      {'stock': 'SBI', 'reason': 'PSU Banks in Leading quadrant'},
    ],
    'seasonal_patterns': [
      {'stock': 'BALRAMCHIN', 'reason': 'Sugar seasonality Oct-March'},
    ],
    'supply_demand_shift': [
      {'stock': 'DLF', 'reason': 'Real estate inventory near decade lows'},
    ],
    'institutional_activity': [
      {'stock': 'HDFCLIFE', 'reason': 'Large FII accumulation in last week'},
    ],
    'global_cues': [
      {'stock': 'TATASTEEL', 'reason': 'China stimulus supportive for metals'},
    ],
    'timeframe': tf,
    'as_of_ist': as_of_ist(),
  }


def best_performer_rows(entity_type: str, tf: str) -> list[dict]:
  if tf not in TIMEFRAMES:
    tf = '1M'
  if entity_type == 'sector':
    return best_sector_rows(tf)
  if entity_type == 'commodity':
    return commodity_breakout_rows(tf)
  return best_stock_rows(tf)


def breakout_rows(entity_type: str, tf: str) -> list[dict]:
  base = potential_breakout_rows(tf)[0]
  return [
    {
      'entity_type': entity_type,
      'entity_symbol': base['symbol'],
      'breakout_type': '52W_HIGH',
      'detected_date': '2026-02-20',
      'breakout_price': base['price'],
      'trigger_volume': 45000000,
      'avg_volume_20d': 15000000,
      'volume_ratio': 3.0,
      'prior_consolidation_days': 45,
      'target_r1': 155,
      'target_r2': 170,
      'stop_loss': 135,
      'confidence_score': base['breakout_probability'],
      'connected_trigger': base['top_reason'],
      'timeframe': tf,
      'because_of': ['Commodity move', 'Policy trigger', 'Technical setup'],
    }
  ]


def graph_payload() -> dict:
  nodes = [
    {'id': 'TATASTEEL', 'type': 'Stock', 'sector': 'Nifty Metal'},
    {'id': 'Copper', 'type': 'Commodity'},
    {'id': 'USD/INR', 'type': 'Currency'},
    {'id': 'RBI Repo Rate', 'type': 'MacroIndicator'},
    {'id': 'PLI Electronics', 'type': 'GovernmentPolicy'},
  ]
  edges = [
    {'source': 'TATASTEEL', 'target': 'Copper', 'relationship': 'CORRELATED_WITH_COMMODITY', 'strength': 0.82, 'timeframe': '1M'},
    {'source': 'TATASTEEL', 'target': 'USD/INR', 'relationship': 'REVENUE_EXPOSED_TO', 'strength': 0.44, 'timeframe': '3M'},
    {'source': 'TATASTEEL', 'target': 'RBI Repo Rate', 'relationship': 'SENSITIVE_TO', 'strength': 0.38, 'timeframe': '1Y'},
  ]
  return {'nodes': nodes, 'edges': edges, 'as_of_ist': as_of_ist()}


GRAPH_VISUAL_CONFIG = {
  'implementation': 'react-force-graph-3d + custom Three.js shaders',
  'edge_visual_mapping': {'thickness_formula': 'strength * 3', 'min_px': 0.5, 'max_px': 5},
  'performance': {'instancing': True, 'lod': True, 'lazy_loading': {'desktop_default': 500, 'mobile_default': 200}},
}


def domain_taxonomy() -> dict:
  return {
    'stock_ranking_columns': STOCK_RANKING_COLUMNS,
    'sector_ranking_columns': SECTOR_RANKING_COLUMNS,
    'breakout_categories': BREAKOUT_CATEGORIES,
    'sectors_tracked': SECTORS_TRACKED,
    'graph_visual_config': GRAPH_VISUAL_CONFIG,
    'as_of_ist': as_of_ist(),
  }
