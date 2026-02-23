"""Granger causality test scaffold."""

from __future__ import annotations

import pandas as pd


def run_granger_test(series_a: pd.Series, series_b: pd.Series, max_lag: int = 10) -> dict:
  """Run Granger causality for A->B and B->A (placeholder)."""
  if len(series_a) < max_lag + 5 or len(series_b) < max_lag + 5:
    return {'ok': False, 'reason': 'insufficient_data'}
  # TODO: integrate statsmodels.tsa.stattools.grangercausalitytests
  return {'ok': True, 'pvalue_a_to_b': None, 'pvalue_b_to_a': None, 'optimal_lag': None}
