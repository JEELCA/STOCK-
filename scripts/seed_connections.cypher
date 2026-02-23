// Stock Universe India pre-seeded market connections (Indian context)

CREATE CONSTRAINT stock_symbol IF NOT EXISTS FOR (s:Stock) REQUIRE s.symbol IS UNIQUE;
CREATE CONSTRAINT commodity_name IF NOT EXISTS FOR (c:Commodity) REQUIRE c.name IS UNIQUE;
CREATE CONSTRAINT sector_name IF NOT EXISTS FOR (se:Sector) REQUIRE se.name IS UNIQUE;
CREATE CONSTRAINT macro_name IF NOT EXISTS FOR (m:MacroIndicator) REQUIRE m.name IS UNIQUE;
CREATE CONSTRAINT policy_name IF NOT EXISTS FOR (p:GovernmentPolicy) REQUIRE p.name IS UNIQUE;

MERGE (brent:Commodity {name: 'Brent_Crude'})
MERGE (gas:Commodity {name: 'Natural_Gas'})
MERGE (copper:Commodity {name: 'Copper'})
MERGE (steel:Commodity {name: 'Steel_HRC'})
MERGE (usd:Currency {name: 'USDINR'})
MERGE (repo:MacroIndicator {name: 'RBI_Repo_Rate'})
MERGE (vix:MacroIndicator {name: 'India_VIX'})
MERGE (fii:MacroIndicator {name: 'FII_Flow'})
MERGE (pli:GovernmentPolicy {name: 'PLI_Electronics'})
MERGE (capex:GovernmentPolicy {name: 'Government_Capex'})
MERGE (monsoon:MacroIndicator {name: 'Monsoon_Rainfall'});

MERGE (s_reliance:Stock {symbol: 'RELIANCE'}) SET s_reliance.name = 'Reliance Industries', s_reliance.sector = 'Energy';
MERGE (s_ioc:Stock {symbol: 'IOC'}) SET s_ioc.name = 'Indian Oil Corporation', s_ioc.sector = 'Energy';
MERGE (s_bpcl:Stock {symbol: 'BPCL'}) SET s_bpcl.name = 'Bharat Petroleum', s_bpcl.sector = 'Energy';
MERGE (s_hpcl:Stock {symbol: 'HPCL'}) SET s_hpcl.name = 'Hindustan Petroleum', s_hpcl.sector = 'Energy';
MERGE (s_indigo:Stock {symbol: 'INDIGO'}) SET s_indigo.name = 'InterGlobe Aviation', s_indigo.sector = 'Aviation';
MERGE (s_ongc:Stock {symbol: 'ONGC'}) SET s_ongc.name = 'ONGC', s_ongc.sector = 'Energy';
MERGE (s_tcs:Stock {symbol: 'TCS'}) SET s_tcs.name = 'Tata Consultancy Services', s_tcs.sector = 'IT';
MERGE (s_infosys:Stock {symbol: 'INFY'}) SET s_infosys.name = 'Infosys', s_infosys.sector = 'IT';
MERGE (s_hindalco:Stock {symbol: 'HINDALCO'}) SET s_hindalco.name = 'Hindalco', s_hindalco.sector = 'Metal';
MERGE (s_tatasteel:Stock {symbol: 'TATASTEEL'}) SET s_tatasteel.name = 'Tata Steel', s_tatasteel.sector = 'Metal';
MERGE (s_hal:Stock {symbol: 'HAL'}) SET s_hal.name = 'Hindustan Aeronautics', s_hal.sector = 'Defence';
MERGE (s_dixon:Stock {symbol: 'DIXON'}) SET s_dixon.name = 'Dixon Technologies', s_dixon.sector = 'Electronics';

MERGE (s_reliance)-[:PRODUCES {direction: 'POSITIVE', strength: 0.79, evidence: ['GRM linkage']}]->(brent);
MERGE (s_ioc)-[:USES_RAW_MATERIAL {direction: 'NEGATIVE', strength: 0.83, evidence: ['imported crude sensitivity']}]->(brent);
MERGE (s_bpcl)-[:USES_RAW_MATERIAL {direction: 'NEGATIVE', strength: 0.84, evidence: ['imported crude sensitivity']}]->(brent);
MERGE (s_hpcl)-[:USES_RAW_MATERIAL {direction: 'NEGATIVE', strength: 0.84, evidence: ['imported crude sensitivity']}]->(brent);
MERGE (s_indigo)-[:USES_RAW_MATERIAL {direction: 'NEGATIVE', strength: 0.88, evidence: ['ATF cost share']}]->(brent);
MERGE (s_ongc)-[:PRODUCES {direction: 'POSITIVE', strength: 0.85, evidence: ['upstream crude realization']}]->(brent);

MERGE (s_tcs)-[:REVENUE_EXPOSED_TO {direction: 'POSITIVE', strength: 0.72, evidence: ['USD export revenue']}]->(usd);
MERGE (s_infosys)-[:REVENUE_EXPOSED_TO {direction: 'POSITIVE', strength: 0.71, evidence: ['USD export revenue']}]->(usd);
MERGE (s_ioc)-[:REVENUE_EXPOSED_TO {direction: 'NEGATIVE', strength: 0.68, evidence: ['USD-linked import bill']}]->(usd);

MERGE (s_hindalco)-[:PRODUCES {direction: 'POSITIVE', strength: 0.74, evidence: ['copper/aluminum prices']}]->(copper);
MERGE (s_tatasteel)-[:PRODUCES {direction: 'POSITIVE', strength: 0.81, evidence: ['steel cycle exposure']}]->(steel);

MERGE (s_dixon)-[:BENEFITS_FROM {direction: 'POSITIVE', strength: 0.76, evidence: ['PLI allocation']}]->(pli);
MERGE (s_hal)-[:BENEFITS_FROM {direction: 'POSITIVE', strength: 0.80, evidence: ['defence capex push']}]->(capex);

MERGE (s_indigo)-[:SENSITIVE_TO {direction: 'NEGATIVE', strength: 0.55, beta: -1.1, evidence: ['higher rates dampen demand']}]->(repo);
MERGE (s_ioc)-[:SENSITIVE_TO {direction: 'NEGATIVE', strength: 0.40, beta: -0.6, evidence: ['demand elasticity']}]->(repo);
MERGE (s_tatasteel)-[:SENSITIVE_TO {direction: 'NEGATIVE', strength: 0.45, beta: -0.8, evidence: ['cyclical financing cost']}]->(repo);

MERGE (s_tatasteel)-[:AFFECTED_BY {direction: 'NEGATIVE', strength: 0.52, evidence: ['risk-off during high volatility']}]->(vix);
MERGE (s_tcs)-[:AFFECTED_BY {direction: 'POSITIVE', strength: 0.40, evidence: ['defensive preference in risk-off']}]->(vix);
MERGE (s_hindalco)-[:AFFECTED_BY {direction: 'POSITIVE', strength: 0.47, evidence: ['FII cyclicals buying phase']}]->(fii);
MERGE (s_dixon)-[:AFFECTED_BY {direction: 'POSITIVE', strength: 0.41, evidence: ['domestic manufacturing sentiment']}]->(monsoon);
