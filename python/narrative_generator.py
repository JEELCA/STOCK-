"""GPT-powered connecting-the-dots narrative scaffold."""

from __future__ import annotations

SYSTEM_PROMPT = """
You are an elite Indian equity research analyst with 20 years of experience.
Use Global Macro -> India Macro -> Sector -> Company -> Price Action.
Only use facts supplied in context. AI-generated analysis. Not investment advice.
""".strip()


def build_narrative_context(symbol: str, payload: dict) -> dict:
  return {
    'symbol': symbol,
    'system_prompt': SYSTEM_PROMPT,
    'payload': payload,
  }


def generate_narrative(symbol: str, payload: dict) -> str:
  """Placeholder narrative until OpenAI API integration."""
  _ = build_narrative_context(symbol, payload)
  return f"Narrative scaffold for {symbol}: integrate GPT-4o call with graph-backed evidence."
