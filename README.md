<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Dh-3G7nRe-xWXFIXCvTtgH9ag8aMzs3s

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Stock Universe India master build prompt
A full end-to-end master prompt is available at:

- `prompts/master_prompt_stock_universe_india.md`
- `prompts/master_prompt_stock_universe_india_full.md`
- `docs/stock_universe_india_complete_build_spec.md`
- `docs/entity_edge_data_contract.md`

## FastAPI realtime backend scaffold
A backend API/WebSocket scaffold is available at:

- `python/api/main.py`
- `python/api/realtime_hub.py`

Run locally (after installing FastAPI + Uvicorn):

```bash
uvicorn python.api.main:app --reload --port 8000
```

Exposed realtime endpoints:

- `ws://localhost:8000/ws/prices`
- `ws://localhost:8000/ws/alerts`

Additional global data fetcher scaffold:

- `python/data_fetchers/global_fetcher.py`


## Live all-cap India market scaffold
The API now includes a live-market service intended to cover all NSE symbols (all cap buckets) by pulling the NSE symbol master and refreshing quotes in batches.

Endpoints:
- `GET /api/live/status`
- `POST /api/live/refresh`
- `GET /api/live/stocks?limit=200&offset=0`
- `GET /api/live/stocks/:symbol`

Implementation notes:
- Universe source: `https://archives.nseindia.com/content/equities/EQUITY_L.csv`
- Quote source: Yahoo quote batch API (`.NS` symbols)
- Refresh loop: every 60 seconds during IST market hours (Mon-Fri, 09:15-15:30)
