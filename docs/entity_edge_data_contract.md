# Stock Universe India — Entity & Edge Data Contract (API/Graph)

This contract captures the detailed node properties and relationship metadata used by the connecting-the-dots engine.

## Core Node Types

### 1) STOCK (sample properties)
- `symbol`, `name`, `sector`, `market_cap_category`
- Live fields: `current_price`, `day_change_pct`, `day_volume`, `avg_volume_20d`, `week_52_high`, `week_52_low`
- Nightly scores: `momentum_score`, `quality_score`, `growth_score`, `value_score`, `breakout_probability`
- Graph features: `connection_count`, `systemic_importance`

### 2) SECTOR
- Core: `name`, `display_name`, `index_symbol`, `constituents_count`, `total_market_cap`
- Performance: `return_1d`, `return_1w`, `return_1m`, `return_3m`, `return_6m`, `return_1y`
- Breadth: `pct_stocks_above_50dma`, `pct_stocks_above_200dma`, `advance_decline_ratio`
- Relative strength: `rs_vs_nifty50_1m`, `rs_vs_nifty50_3m`
- Macro betas: `beta_to_crude`, `beta_to_usd_inr`, `beta_to_china_pmi`, `beta_to_india_iip`
- Regime: `regime_score`

### 3) COMMODITY
- `name`, `symbol`, `mcx_symbol`, `category`, `unit`, `current_price`
- Performance: all six timeframes
- Breakout: `breakout_status`, `breakout_type`, `breakout_date`
- Seasonality: `seasonal_bias_current_month`, `seasonal_avg_return_current_month`
- India context: `india_import_dependency_pct`, `india_annual_import_value_usd_bn`

### 4) CURRENCY
- `pair`, `current_rate`, returns across six timeframes
- `rbi_reference_rate`, `forward_premium_1m`, `india_reer`, `india_neer`

### 5) MACRO_INDICATOR_INDIA / GLOBAL
- `name`, `code`, `latest_value`, `previous_value`, `trend`, `frequency`, `unit`, `source`, `last_updated`
- Context bands and historical averages
- Impact mapping to sectors (`most_affected_sectors`, `least_affected_sectors`)

### 6) GLOBAL_INDEX
- `name`, `symbol`, `current_value`, six-timeframe performance, optional valuation and correlation fields

### 7) GEOPOLITICAL_EVENT
- Identity: `id`, `title`, `category`, `region`, `status`, `severity`
- Impact: `global_impact_score`, `india_impact_score`
- Mapped effects on commodities/sectors/stocks with direction and rationale
- `historical_analogue`, `ai_analysis`, `source_urls`, `last_updated`

### 8) GOVERNMENT_POLICY
- Identity: `id`, `title`, `category`, `ministry`, dates, status
- Financial footprint: `budget_allocation_cr`, `duration_years`, `utilization_pct`
- Impact maps: beneficiary and adverse sectors/stocks

### 9) SUPPLY_CHAIN_NODE
- `upstream`, `downstream`, `category`, `description`
- `key_indian_companies_in_this_stage`, `value_addition_pct`, `india_capacity`, `import_dependency`

### 10) THEME / COMPANY_EVENT / PERSON / INDUSTRY_GROUP
- Theme-level basket modeling, event markers, promoter/management tracking, and sub-sector granularity.

## Relationship Catalog (selected)
- Structural: `BELONGS_TO`, `BELONGS_TO_INDUSTRY`, `PART_OF_THEME`
- Supply chain: `USES_RAW_MATERIAL`, `PRODUCES`, `SUPPLIES_TO`, `PURCHASES_FROM`
- Corporate links: `COMPETES_WITH`, `SUBSIDIARY_OF`, `PROMOTER_GROUP`, `JOINT_VENTURE_WITH`
- Exposures: `REVENUE_EXPOSED_TO`, `COST_EXPOSED_TO`, `SENSITIVE_TO`, `DRIVEN_BY`
- Policy/geopolitics: `BENEFITS_FROM`, `HURT_BY`, `AFFECTED_BY`
- Statistical: `CORRELATED_WITH`, `CORRELATED_WITH_COMMODITY`, `CORRELATED_WITH_INDEX`
- Temporal: `LEADS`, `OUTPERFORMS_IN_REGIME`, `SEASONAL_PATTERN`
- Ownership/flow: `FII_HOLDING_TREND`

## Standard Edge Metrics
All computed edges should include as available:
- `strength`, `confidence`, `direction`, `lag_days/lag_months`
- Multi-window correlations (`21/63/126/252` days)
- Granger p-values and optimal lag
- Partial correlation / MI / transfer entropy where computed
- `computed_date`, `last_updated`, `evidence`

## API Exposure
This contract is surfaced in mock form by:
- `GET /api/domain/taxonomy`
- `GET /api/graph/full`
- `GET /api/stocks/:symbol/connections`
