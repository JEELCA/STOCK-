"""Build and update Neo4j graph from computed relationships."""

from __future__ import annotations


def upsert_stock_node(tx, stock: dict) -> None:
  tx.run(
    """
    MERGE (s:Stock {symbol: $symbol})
    SET s.name = $name,
        s.sector = $sector,
        s.market_cap_category = $market_cap_category,
        s.updated_at = datetime()
    """,
    **stock,
  )


def upsert_correlation_edge(tx, edge: dict) -> None:
  tx.run(
    """
    MATCH (a:Stock {symbol: $from_symbol}), (b:Stock {symbol: $to_symbol})
    MERGE (a)-[r:CORRELATED_WITH {timeframe: $timeframe}]->(b)
    SET r.pearson = $pearson,
        r.spearman = $spearman,
        r.last_updated = datetime()
    """,
    **edge,
  )
