
export interface Stock {
    symbol: string;
    name: string;
    sector: string;
    market_cap: number;
    current_price: number;
}

export interface PToolData {
    score: number;
    rating: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR';
}

export interface FundamentalData {
    revenue_growth: number;
    profit_margin: number;
    roe: number;
    debt_equity: number;
    is_sustainable: 'Yes' | 'No' | 'Partial';
}

export interface TechnicalData {
    rsi: number;
    macd_signal: 'Bullish' | 'Bearish' | 'Neutral';
    trend: 'Uptrend' | 'Downtrend' | 'Sideways';
    technical_signal: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG SELL';
}

export interface ForensicData {
    risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    red_flags_count: number;
    issues_list: string[];
}

export interface SentimentData {
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    news_count: number;
    fraud_alerts: number;
}

export interface PeerData {
    peer_growth_diff: number;
    valuation_premium: number;
    growth_real: 'Yes' | 'No';
}

export interface EconomicIndicator {
    value: string | number;
    trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
    impact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}

export interface MarketConditions {
    trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    volatility: 'LOW' | 'MODERATE' | 'HIGH';
    sentiment: 'RISK-ON' | 'RISK-OFF' | 'NEUTRAL';
}

export interface SectorOutlook {
    trend: 'STRONG' | 'MODERATE' | 'STABLE' | 'RECOVERY' | 'TRANSITION' | 'BOOMING';
    outlook: 'VERY POSITIVE' | 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
    drivers: string[];
}

export interface MacroData {
    macro_outlook: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
    economic_indicators: {
        gdp_growth: EconomicIndicator;
        inflation_rate: EconomicIndicator;
        manufacturing_pmi: EconomicIndicator;
    };
    market_conditions: MarketConditions;
    sector_outlook: SectorOutlook;
}

export interface FullAnalysisData {
    stock: Stock;
    p_tool: PToolData;
    fundamental: FundamentalData;
    technical: TechnicalData;
    forensic: ForensicData;
    sentiment: SentimentData;
    peer: PeerData;
    macro: MacroData;
}

export interface AIRecommendation {
    recommendation: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'REJECT';
    confidence_score: number;
    key_reasoning: string[];
    strengths: string[];
    risks: string[];
    target_price: string;
    stop_loss: string;
    investment_horizon: 'Short Term (3-6mo)' | 'Medium Term (6-12mo)' | 'Long Term (12+ mo)';
    position_size: 'Conservative (1-3%)' | 'Moderate (3-5%)' | 'Aggressive (5-10%)';
}

export type AnalysisStage = 
  | 'P-Tool Score'
  | 'Fundamental Analysis'
  | 'Technical Analysis'
  | 'Forensic Checks'
  | 'News & Sentiment'
  | 'Peer Comparison'
  | 'Macro Analysis'
  | 'AI Recommendation';

export const ALL_STAGES: AnalysisStage[] = [
  'P-Tool Score',
  'Fundamental Analysis',
  'Technical Analysis',
  'Forensic Checks',
  'News & Sentiment',
  'Peer Comparison',
  'Macro Analysis',
  'AI Recommendation',
];