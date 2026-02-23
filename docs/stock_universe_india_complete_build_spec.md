# 🌌 Stock Universe India — Complete Build Specification

## Project Identity
- **Name:** Stock Universe India
- **Tagline:** Every stock lives in a universe of connections. We map the entire universe for you.
- **Universe:** NSE + BSE only (including SME), INR pricing, IST timestamps.

## Research Persona and Frameworks
The product should reason as a macro-to-micro quant-fundamental research engine using:
- Mantegna (1999) market topology (MST)
- Billio et al. (2012) connectedness and Granger causality
- Acemoglu et al. (2012) network shock propagation
- Diebold-Yilmaz (2014) spillovers
- Ross APT (1976) multi-factor decomposition
- Hamilton regime switching (1989)
- Leontief I/O for India sector links
- India-localized factor stacks (Fama-French-Carhart adaptations)
- PMFG, partial correlations, and centrality-driven graph ranking

## Macro → Sector → Stock Operating Model
1. **Global Macro:** Fed policy, DXY, US yields, China, OPEC, global liquidity.
2. **India Macro:** RBI cycle, fiscal capex, INR, credit cycle, monsoon/rural demand.
3. **Sector Layer:** sector betas, RS momentum, earnings breadth, policy sensitivity.
4. **Stock Layer:** quality/growth/momentum/valuation/catalyst/connectedness.

## Tech Architecture
- **Frontend:** Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui
- **3D:** react-force-graph-3d + Three.js + r3f + drei + postprocessing
- **Charts:** lightweight-charts + D3 + Recharts + visx
- **State:** Zustand + TanStack Query
- **Backend:** FastAPI compute + optional Next API BFF
- **Queues/Scheduling:** Celery + Redis + APScheduler
- **Datastores:** PostgreSQL+Timescale, Neo4j, Redis, Qdrant (optional ClickHouse)
- **AI/ML:** OpenAI GPT, sentence-transformers, spaCy, FinBERT, statsmodels, sklearn, networkx, xgboost, arch

## Core Functional Requirements
- 3D graph with node type styling, relation directionality, edge strength, filters, neighborhoods, shortest path, communities, time slider.
- Stock deep dive with chart + indicators + fundamentals + ownership + peers + AI narrative + scenario analysis.
- Macro/sector/commodity/geopolitics dashboards.
- Screener with connection-native filters.
- Alerts and watchlists (including correlation-shift and event-impact alerts).

## Mandatory Timeframes
Use across performers, breakouts, and potential breakouts:
- `1D`, `1W`, `1M`, `3M`, `6M`, `1Y`

## Data + Graph Model
### Entity Types
- Stock, Sector, Commodity, Currency, MacroIndicator, GlobalMacro, GlobalIndex,
  GeopoliticalEvent, GovernmentPolicy, SupplyChainNode.

### Relationship Types
- BELONGS_TO, USES_RAW_MATERIAL, PRODUCES, REVENUE_EXPOSED_TO,
  SUPPLIES_TO, COMPETES_WITH, SUBSIDIARY_OF, PROMOTER_ALSO_OWNS,
  CORRELATED_WITH, SENSITIVE_TO, BENEFITS_FROM, HURT_BY, AFFECTED_BY,
  DRIVEN_BY, INFLUENCED_BY, LEADS.

### Edge Properties
- direction, strength, confidence, correlation windows, granger p-values,
  lead-lag metadata, evidence list, last_updated.

## Quant Engine Requirements
Nightly:
- Correlation matrix, Granger tests, lead-lag detection, regime classification,
  breakout detection family, breakout probability inference, graph updates,
  narratives and alert events.

Weekly:
- model retraining and full recomputation.

Monthly:
- macro/shareholding refresh and regime recalibration.

## API Contract (Minimum)
- Stocks, sectors, commodities, macro, graph, breakouts, performers,
  correlations, geopolitics, strategies, screener, alerts, watchlist.
- Realtime sockets: `/ws/prices`, `/ws/alerts`.

## India-Specific Seed Connections
Must include directional templates for:
- Crude, gas, metals, USDINR, repo, VIX, FII flows, monsoon,
  PLI themes, China+1, government capex, seasonality patterns.

## Legal and Compliance Messaging
On every page:
- AI-generated analysis. Not investment advice.
- Informational only. Not SEBI registered. Consult a SEBI-registered advisor.

## Performance and Reliability Targets
- 3D graph smoothness target for 500+ nodes at interactive FPS.
- Progressive loading + LOD + edge simplification.
- Redis caching and stale-data fallback behavior with explicit timestamps.
- Error handling and retries for ingestion sources.

## Delivery Plan
1. MVP data backbone and dashboard baseline
2. 3D graph core + seeded connections
3. AI narrative + news/entity integration
4. Advanced breakout/screener/geopolitics
5. Alerts, auth, performance hardening, docs


## 3D Interactive Knowledge Graph Design Contract
- Rendering stack: react-force-graph-3d + custom Three.js shaders.
- Stock node sizing by market-cap bucket with logarithmic radius scaling.
- Sector-locked color palette is mandatory across app and graph.
- Edge style maps to relationship semantics (positive/negative/causal/supply/policy).
- Directional particle flow should represent influence and lag direction.
- Interaction requirements: hover isolate, click focus+detail panel, context menu actions,
  shortest path, neighborhood expansion, and camera presets.
- Performance contract: instancing + LOD + frustum culling + worker simulation.
- Mobile fallback contract: 2D graph + node reduction + reduced effects.
