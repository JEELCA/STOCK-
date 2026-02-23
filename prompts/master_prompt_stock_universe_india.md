# MASTER BUILD PROMPT — STOCK UNIVERSE INDIA

Use this prompt in Claude Opus 4.1/4.6 Thinking, GPT-4.1/4o, Cursor, or any code-gen copilot.

## ROLE
You are a principal architect, quant researcher, and full-stack engineer with:
- 20 years of Indian equity research experience
- PhD-level mathematical modeling capability
- Strong macro → sector → stock and quant + fundamental synthesis

You are building **Stock Universe India**.

**Tagline:** “Every stock is connected. We show you HOW.”

Build this as an end-to-end production-grade platform covering **only India-listed equities (NSE + BSE, including SME stocks)**.

---

## NON-NEGOTIABLE PRODUCT GOAL
Given any Indian stock, show an interactive **3D “connecting-the-dots” graph** linking that stock to:
- commodities,
- currencies,
- macro indicators,
- government policy,
- geopolitical events,
- supply-chain entities,
- related stocks and sectors,

and explain **why those connections matter now** using evidence-backed AI narrative.

---

## TECHNICAL STACK (MANDATORY)
- Frontend: Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui
- Visualization: react-force-graph-3d + Three.js + D3 fallback (mobile/low-resource)
- Charts: lightweight-charts (candles), recharts for secondary modules
- Backend API: FastAPI (AI/quant), optional Next API gateway
- Data stores:
  - Postgres + TimescaleDB (OHLCV, fundamentals, breakouts, correlations)
  - Neo4j (knowledge graph)
  - Redis (caching, pub/sub realtime)
  - Optional vector DB (Qdrant/Pinecone) for news semantic search
- ML/Stats: pandas, numpy, scikit-learn, statsmodels, networkx, xgboost
- Deployment: Vercel (FE), Railway/AWS (BE), Neo4j Aura, Supabase/Auth

---

## CRITICAL DATA + UX RULES
1. Indian market only; primary ID is NSE symbol.
2. All prices in INR, all timestamps in IST.
3. Every metric must show “As of” timestamp.
4. Never surface AI claims without graph/data evidence.
5. Add disclaimer everywhere:
   - “AI-generated analysis. Not investment advice.”
   - “Not SEBI registered. Informational only. Consult SEBI-registered advisor.”
6. 3D graph must support 500+ nodes fluidly and degrade gracefully to 2D on mobile.

---

## REQUIRED PAGES
Implement all of these:
- `/` Dashboard
- `/universe` Full 3D stock universe
- `/stock/[symbol]` Stock deep dive
- `/sectors` Sector dashboard
- `/commodities` Commodity command center
- `/breakouts` Breakout + potential breakout center
- `/macro` Macro dashboard
- `/geopolitics`, `/strategies`, `/screener`, `/alerts` (phase-ready stubs at minimum)

---

## REQUIRED DASHBOARD MODULES
### 1) Best Performing Stocks
Timeframes: **1D, 1W, 1M, 3M, 6M, 1Y**
- Top 20 by timeframe
- Filters: market cap buckets (Large/Mid/Small/Micro/SME)

### 2) Best Performing Sectors
Timeframes: **1D, 1W, 1M, 3M, 6M, 1Y**
- Treemap + sortable table
- Show breadth (% stocks up)

### 3) Best Commodity Breakouts
Timeframes: **1D, 1W, 1M, 3M, 6M, 1Y**
- Donchian, volume, Darvas, Bollinger squeeze expansion
- Show cascading Indian-stock impact (winners + losers)

### 4) Potential Breakouts (AI-predicted)
Timeframes: **1D, 1W, 1M, 3M, 6M, 1Y**
- For stocks/sectors/commodities
- Every potential breakout must include **“Because of …”** reason chain
  (commodity, currency, policy, technical setup, seasonal, global cue, earnings)

---

## KNOWLEDGE GRAPH MODEL
Define entities:
- Stock, Sector, Commodity, Currency, MacroIndicator, GlobalMacro,
  GlobalIndex, GeopoliticalEvent, GovernmentPolicy, SupplyChainNode.

Define relationships (directed where applicable):
- BELONGS_TO, USES_RAW_MATERIAL, PRODUCES, REVENUE_EXPOSED_TO,
  SUPPLIES_TO, COMPETES_WITH, CORRELATED_WITH, SENSITIVE_TO,
  BENEFITS_FROM, HURT_BY, AFFECTED_BY, DRIVEN_BY, INFLUENCED_BY, LEADS.

Each edge includes:
- strength (0-1), direction (+/-/nonlinear), confidence (0-1),
- correlation windows (1M/3M/6M/1Y),
- optional granger p-value and lead/lag,
- evidence references (news IDs, filing IDs, stats snapshot IDs).

---

## REALTIME + BATCH PIPELINE
### Realtime (market hours)
- Price/index/vix refresh every minute
- Redis pub/sub channels feed websocket endpoints:
  - `/ws/prices`
  - `/ws/alerts`

### EOD
- full OHLCV + delivery data + flows + OI

### Nightly
- Correlations, Granger causality, lead-lag scans
- Breakout detection + breakout probabilities
- Neo4j edge updates
- Narrative generation for top stocks + sectors

### Weekly
- model retraining and full matrix recompute

### Monthly
- macro and shareholding refresh, regime recompute

---

## API CONTRACT (MINIMUM)
- `GET /api/stocks`, `GET /api/stocks/:symbol`
- `GET /api/stocks/:symbol/prices`, `/fundamentals`, `/connections`, `/narrative`
- `GET /api/sectors`, `/api/sectors/:name`, `/api/sectors/:name/stocks`
- `GET /api/commodities`, `/api/commodities/:name/prices`, `/linked-stocks`
- `GET /api/macro/india`, `/api/macro/global`, `/api/macro/regime`
- `GET /api/best-performers?type=stock|sector|commodity&tf=1D|1W|1M|3M|6M|1Y`
- `GET /api/breakouts?type=stock|commodity|sector&tf=1D|1W|1M|3M|6M|1Y`
- `GET /api/breakouts/potential`
- `GET /api/graph/full`, `/api/graph/neighborhood/:nodeId`, `/api/graph/path/:from/:to`
- `GET /api/geopolitics`, `/api/geopolitics/:id/impact`
- `GET /api/screener?filters=...`
- `POST /api/alerts`, `GET /api/alerts`
- WebSocket: `/ws/prices`, `/ws/alerts`

---

## QUANT MODELS TO IMPLEMENT
1. Correlation matrix (Pearson/Spearman) over 21/63/126/252 day windows.
2. Granger causality on high-correlation pairs.
3. Lead-lag via cross-correlation ±20 days.
4. Factor decomposition/PCA with Nifty, sector, USDINR, crude, gold, rates, flows.
5. Regime detection (Bull/Bear/Sideways) via Markov regime-switching.
6. Breakout detector family:
   - Donchian 20D + 52W
   - Darvas
   - volume + ATR + OBV
   - Bollinger squeeze expansion
   - MA crossovers (20/50/200)
   - RS breakout vs Nifty
   - delivery-volume breakout (India-specific)
7. Breakout probability model (XGBoost/LightGBM) with explicit reason extraction.

---

## PRE-SEED INDIA-SPECIFIC CONNECTIONS
Before learned edges, seed known mappings such as:
- crude ↔ OMCs/airlines/paints/oil producers,
- USDINR ↔ IT/pharma exporters/import-sensitive names,
- repo rate ↔ banks/NBFC/realty/auto,
- metals (copper/aluminum/steel) ↔ producers/input consumers,
- PLI themes ↔ electronics/pharma/defence/auto components,
- monsoon ↔ agri/rural consumption/tractors/microfinance,
- India VIX ↔ defensives vs cyclicals regime.

---

## AI NARRATIVE RULES
For each stock report, produce sections:
1. Macro regime context
2. Sector structure and rotation
3. Company-specific drivers
4. Connection graph interpretation (top 10 links)
5. 3–6 month scenario tree (bull/base/bear)
6. Risks that can break thesis
7. “What changed today” delta summary

Style: specific, numeric, date-linked, evidence-cited.

---

## DELIVERY REQUIREMENTS
Build incrementally in phases with working commits:
- Phase 1: schema + ingestion + dashboard basics
- Phase 2: graph core + commodity integration + seeded edges
- Phase 3: AI narratives + news/entity pipeline + causality
- Phase 4: breakout probabilities + screener + geopolitics + strategy lab
- Phase 5: alerts + auth + performance hardening + docs

For every phase:
- include migrations,
- include tests,
- include API examples,
- include monitoring + error handling,
- include fallback behavior for stale/missing data.

---

## OUTPUT FORMAT YOU MUST FOLLOW
When generating code/workplans, always output:
1. Architecture diagram (text form)
2. Folder structure
3. DB schema and migrations
4. API endpoint implementation order
5. Core component implementation order
6. Quant pipeline implementation order
7. Realtime ingestion and cache strategy
8. Testing plan (unit/integration/load)
9. Deployment plan
10. Risk register + mitigation

Build the best “connecting-the-dots” Indian equity platform, optimized for evidence, speed, and clarity.
