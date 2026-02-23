# MASTER PROMPT (FULL) — STOCK UNIVERSE INDIA

You are building **Stock Universe India** — “Every stock is connected. We show you HOW.”

## 1) Core Mission
Create the best “connecting-the-dots” platform for **NSE + BSE only** (Large/Mid/Small/Micro/SME) where users:
1. Select any Indian stock and instantly see an interactive 3D graph of all linked drivers.
2. View best performers and breakouts across **1D/1W/1M/3M/6M/1Y**.
3. Read AI evidence-backed narrative explaining **why now**.

## 2) Required Stack
- Next.js 14 + TypeScript + Tailwind + shadcn/ui
- react-force-graph-3d + Three.js (+ D3 fallback)
- FastAPI for quant/AI services
- Redis (realtime/caching), Postgres+Timescale (timeseries), Neo4j (graph)
- OpenAI (narratives), sentence-transformers, statsmodels, scikit-learn, networkx, xgboost

## 3) Data + Entity Model
Implement graph nodes:
- Stock, Sector, Commodity, Currency, MacroIndicator, GlobalMacro, GlobalIndex,
  GeopoliticalEvent, GovernmentPolicy, SupplyChainNode.

Implement relationships:
- BELONGS_TO, USES_RAW_MATERIAL, PRODUCES, REVENUE_EXPOSED_TO, SUPPLIES_TO,
  COMPETES_WITH, SUBSIDIARY_OF, PROMOTER_ALSO_OWNS, CORRELATED_WITH,
  SENSITIVE_TO, BENEFITS_FROM, HURT_BY, AFFECTED_BY, DRIVEN_BY, INFLUENCED_BY, LEADS.

Edge fields:
- strength, confidence, direction, correlation windows (60/120/252), granger p-value,
  timeframe label, last_updated, evidence list.

## 4) 3D Graph UX
- Stock nodes = spheres, size by log(market cap), color by sector
- Commodity = cube, macro = diamond, policy = star, currency = cylinder, event = octahedron
- Edge thickness = strength, color green/red/blue for positive/negative/causal
- Interactions: click-center, explore from node, neighborhood, shortest path,
  timeframe filtering, positive/negative filtering, clustering (Louvain), time slider.
- Presets: Macro View, Sector Dive, Supply Chain, Correlation Galaxy, Geopolitical Impact.

## 5) Dashboards (Mandatory)
### Dashboard (/)
- Top bar with market ticker, global pulse, FII/DII
- Best performers (stocks, sectors)
- Commodity breakouts
- Potential breakouts with “Because of…” cause chains

### Deep Pages
- /stock/[symbol]: chart, fundamentals, ownership, peer table, graph, narrative, scenario analysis
- /sectors, /commodities, /macro, /geopolitics, /strategies, /screener, /alerts, /universe

## 6) Quant Engine
Nightly batch must run:
- Correlation matrix (21/63/126/252)
- Granger causality (lags 1..10)
- Lead-lag detection
- Regime detection (Bull/Bear/Sideways)
- Breakout detection family:
  Donchian, Darvas, volume+ATR+OBV, Bollinger squeeze expansion, MA crosses,
  RS breakout, delivery breakout (India-specific)
- Breakout probability model inference (XGBoost)

Weekly:
- Retraining + full recompute

Monthly:
- Macro/shareholding refresh + regime recalibration

## 7) API Contract
Expose:
- Stocks, sectors, commodities, macro, graph, breakouts, best-performers,
  correlations, geopolitics, screener, strategies, search, alerts/watchlist
- Realtime websockets:
  - /ws/prices
  - /ws/alerts

## 8) Pre-seed Known India Connections
Include templates for crude, gas, gold, copper, aluminum, steel, USDINR,
repo rate, VIX, FII flows, monsoon, PLI, China+1, government capex, seasonality.

## 9) Legal + Data Rules
- Indian market only, INR only, IST timestamps only.
- Show “As of [timestamp]” everywhere.
- AI text must be graph-backed and numerical.
- Add disclaimer on every page:
  - “AI-generated analysis. Not investment advice.”
  - “Not SEBI registered. Informational only.”

## 10) Delivery Format (for each output)
Always provide:
1. Architecture
2. Folder structure
3. Schema/migrations
4. API implementation order
5. Frontend component plan
6. Quant pipeline plan
7. Realtime + caching strategy
8. Testing plan
9. Deployment plan
10. Risks + mitigations

Build this as a production-ready, evidence-first, awe-inspiring graph intelligence system for Indian equities.
