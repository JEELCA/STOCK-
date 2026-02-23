-- PostgreSQL + TimescaleDB schema for Stock Universe India

CREATE TABLE IF NOT EXISTS stocks (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(200),
  isin VARCHAR(12),
  bse_code VARCHAR(10),
  sector VARCHAR(100),
  industry VARCHAR(100),
  sub_industry VARCHAR(100),
  market_cap_category VARCHAR(20), -- Large/Mid/Small/Micro/SME
  listing_date DATE,
  face_value DECIMAL(10,2),
  is_fno BOOLEAN DEFAULT FALSE,
  is_index_member JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stock_prices (
  time TIMESTAMPTZ NOT NULL,
  stock_id INTEGER REFERENCES stocks(id),
  open DECIMAL(12,2),
  high DECIMAL(12,2),
  low DECIMAL(12,2),
  close DECIMAL(12,2),
  volume BIGINT,
  delivery_volume BIGINT,
  delivery_pct DECIMAL(5,2),
  turnover DECIMAL(15,2),
  trades INTEGER,
  vwap DECIMAL(12,2)
);

CREATE TABLE IF NOT EXISTS stock_fundamentals (
  id SERIAL PRIMARY KEY,
  stock_id INTEGER REFERENCES stocks(id),
  quarter VARCHAR(10),
  fiscal_year VARCHAR(10),
  revenue DECIMAL(15,2),
  ebitda DECIMAL(15,2),
  ebitda_margin DECIMAL(5,2),
  pat DECIMAL(15,2),
  eps DECIMAL(10,2),
  roce DECIMAL(5,2),
  roe DECIMAL(5,2),
  debt_to_equity DECIMAL(5,2),
  current_ratio DECIMAL(5,2),
  cfo DECIMAL(15,2),
  capex DECIMAL(15,2),
  promoter_holding DECIMAL(5,2),
  fii_holding DECIMAL(5,2),
  dii_holding DECIMAL(5,2),
  promoter_pledge DECIMAL(5,2),
  pe_ratio DECIMAL(10,2),
  pb_ratio DECIMAL(10,2),
  ev_ebitda DECIMAL(10,2),
  dividend_yield DECIMAL(5,2),
  report_date DATE
);

CREATE TABLE IF NOT EXISTS commodity_prices (
  time TIMESTAMPTZ NOT NULL,
  commodity VARCHAR(50),
  source VARCHAR(20), -- MCX / LME / NYMEX / CBOT
  open DECIMAL(12,2),
  high DECIMAL(12,2),
  low DECIMAL(12,2),
  close DECIMAL(12,2),
  volume BIGINT,
  unit VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS macro_data (
  time TIMESTAMPTZ NOT NULL,
  indicator VARCHAR(100),
  value DECIMAL(15,4),
  country VARCHAR(10) DEFAULT 'IN',
  frequency VARCHAR(10), -- daily/weekly/monthly/quarterly
  source VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS breakouts (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(20), -- stock / commodity / sector
  entity_symbol VARCHAR(50),
  breakout_type VARCHAR(50),
  detected_date DATE,
  breakout_price DECIMAL(12,2),
  trigger_volume BIGINT,
  volume_ratio DECIMAL(5,2),
  consolidation_days INTEGER,
  target_r1 DECIMAL(12,2),
  target_r2 DECIMAL(12,2),
  stop_loss DECIMAL(12,2),
  confidence_score DECIMAL(3,2),
  connected_trigger TEXT,
  timeframe VARCHAR(10),
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news_articles (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  source VARCHAR(100),
  url TEXT,
  published_at TIMESTAMPTZ,
  sentiment DECIMAL(3,2),
  entities JSONB,
  embedding VECTOR(384),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS correlations (
  id SERIAL PRIMARY KEY,
  entity1_type VARCHAR(20),
  entity1_symbol VARCHAR(50),
  entity2_type VARCHAR(20),
  entity2_symbol VARCHAR(50),
  timeframe_days INTEGER,
  pearson_corr DECIMAL(5,4),
  spearman_corr DECIMAL(5,4),
  granger_pvalue_1to2 DECIMAL(8,6),
  granger_pvalue_2to1 DECIMAL(8,6),
  granger_optimal_lag INTEGER,
  computed_date DATE,
  UNIQUE(entity1_symbol, entity2_symbol, timeframe_days, computed_date)
);

CREATE TABLE IF NOT EXISTS best_performers (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(20), -- stock / sector / commodity
  entity_symbol VARCHAR(50),
  timeframe VARCHAR(10), -- 1D/1W/1M/3M/6M/1Y
  return_pct DECIMAL(8,2),
  volume_vs_avg DECIMAL(5,2),
  rank INTEGER,
  computed_date DATE
);

CREATE TABLE IF NOT EXISTS geopolitical_events (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  event_date DATE,
  category VARCHAR(50),
  severity INTEGER,
  sentiment DECIMAL(3,2),
  affected_sectors JSONB,
  affected_commodities JSONB,
  affected_stocks JSONB,
  source_urls JSONB,
  ai_analysis TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
