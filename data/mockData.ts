
import { FullAnalysisData, Stock, MacroData } from '../types';

export const mockStocks: Stock[] = [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd', sector: 'Oil & Gas', market_cap: 1925000, current_price: 2845 },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services', sector: 'IT', market_cap: 1380000, current_price: 3850 },
    { symbol: 'INFY.NS', name: 'Infosys Ltd', sector: 'IT', market_cap: 650000, current_price: 1550 },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', sector: 'Banking', market_cap: 1250000, current_price: 1650 },
    { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd', sector: 'Banking', market_cap: 780000, current_price: 1100 },
    { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Ltd', sector: 'Finance', market_cap: 450000, current_price: 7200 },
];

const positiveMacroOilGas: MacroData = {
    macro_outlook: 'POSITIVE',
    economic_indicators: {
        gdp_growth: { value: '6.8%', trend: 'IMPROVING', impact: 'POSITIVE' },
        inflation_rate: { value: '4.9%', trend: 'DECLINING', impact: 'POSITIVE' },
        manufacturing_pmi: { value: 57.2, trend: 'IMPROVING', impact: 'POSITIVE' },
    },
    market_conditions: {
        trend: 'BULLISH',
        volatility: 'MODERATE',
        sentiment: 'RISK-ON',
    },
    sector_outlook: {
        trend: 'TRANSITION',
        outlook: 'POSITIVE',
        drivers: ['Renewable energy push', 'Energy security focus', 'Grid modernization'],
    }
};

const neutralMacroIT: MacroData = {
    macro_outlook: 'NEUTRAL',
    economic_indicators: {
        gdp_growth: { value: '6.8%', trend: 'IMPROVING', impact: 'POSITIVE' },
        inflation_rate: { value: '4.9%', trend: 'DECLINING', impact: 'POSITIVE' },
        manufacturing_pmi: { value: 57.2, trend: 'IMPROVING', impact: 'POSITIVE' },
    },
    market_conditions: {
        trend: 'NEUTRAL',
        volatility: 'MODERATE',
        sentiment: 'NEUTRAL',
    },
    sector_outlook: {
        trend: 'STRONG',
        outlook: 'POSITIVE',
        drivers: ['Digital transformation', 'Cloud adoption', 'AI/ML demand'],
    }
};

const positiveMacroBanking: MacroData = {
    macro_outlook: 'POSITIVE',
    economic_indicators: {
        gdp_growth: { value: '6.8%', trend: 'IMPROVING', impact: 'POSITIVE' },
        inflation_rate: { value: '4.9%', trend: 'DECLINING', impact: 'POSITIVE' },
        manufacturing_pmi: { value: 57.2, trend: 'IMPROVING', impact: 'POSITIVE' },
    },
    market_conditions: {
        trend: 'BULLISH',
        volatility: 'LOW',
        sentiment: 'RISK-ON',
    },
    sector_outlook: {
        trend: 'STRONG',
        outlook: 'VERY POSITIVE',
        drivers: ['Strong credit growth', 'Improving asset quality', 'Digital banking adoption'],
    }
};

const mixedMacroFinance: MacroData = {
    macro_outlook: 'NEUTRAL',
    economic_indicators: {
        gdp_growth: { value: '6.8%', trend: 'IMPROVING', impact: 'POSITIVE' },
        inflation_rate: { value: '4.9%', trend: 'DECLINING', impact: 'POSITIVE' },
        manufacturing_pmi: { value: 57.2, trend: 'IMPROVING', impact: 'POSITIVE' },
    },
    market_conditions: {
        trend: 'NEUTRAL',
        volatility: 'HIGH',
        sentiment: 'NEUTRAL',
    },
    sector_outlook: {
        trend: 'MODERATE',
        outlook: 'NEUTRAL',
        drivers: ['Rising consumer demand', ' Fintech competition', 'Regulatory scrutiny'],
    }
};


export const mockAnalysisData: Record<string, FullAnalysisData> = {
    'RELIANCE.NS': {
        stock: mockStocks[0],
        p_tool: { score: 92.5, rating: 'EXCELLENT' },
        fundamental: { revenue_growth: 18.2, profit_margin: 15.1, roe: 12.5, debt_equity: 0.45, is_sustainable: 'Yes' },
        technical: { rsi: 68, macd_signal: 'Bullish', trend: 'Uptrend', technical_signal: 'STRONG BUY' },
        forensic: { risk_level: 'LOW', red_flags_count: 0, issues_list: ['None'] },
        sentiment: { sentiment: 'Positive', news_count: 45, fraud_alerts: 0 },
        peer: { peer_growth_diff: 5.5, valuation_premium: 15.0, growth_real: 'Yes' },
        macro: positiveMacroOilGas
    },
    'TCS.NS': {
        stock: mockStocks[1],
        p_tool: { score: 89.3, rating: 'EXCELLENT' },
        fundamental: { revenue_growth: 12.5, profit_margin: 24.1, roe: 45.8, debt_equity: 0.1, is_sustainable: 'Yes' },
        technical: { rsi: 62, macd_signal: 'Bullish', trend: 'Uptrend', technical_signal: 'BUY' },
        forensic: { risk_level: 'LOW', red_flags_count: 0, issues_list: ['None'] },
        sentiment: { sentiment: 'Neutral', news_count: 38, fraud_alerts: 0 },
        peer: { peer_growth_diff: 2.1, valuation_premium: 25.0, growth_real: 'Yes' },
        macro: neutralMacroIT
    },
    'INFY.NS': {
        stock: mockStocks[2],
        p_tool: { score: 87.1, rating: 'EXCELLENT' },
        fundamental: { revenue_growth: 11.8, profit_margin: 21.5, roe: 31.2, debt_equity: 0.08, is_sustainable: 'Yes' },
        technical: { rsi: 58, macd_signal: 'Neutral', trend: 'Sideways', technical_signal: 'HOLD' },
        forensic: { risk_level: 'LOW', red_flags_count: 0, issues_list: ['None'] },
        sentiment: { sentiment: 'Neutral', news_count: 35, fraud_alerts: 0 },
        peer: { peer_growth_diff: 1.5, valuation_premium: 18.0, growth_real: 'Yes' },
        macro: neutralMacroIT
    },
    'HDFCBANK.NS': {
        stock: mockStocks[3],
        p_tool: { score: 85.8, rating: 'EXCELLENT' },
        fundamental: { revenue_growth: 22.0, profit_margin: 20.3, roe: 17.5, debt_equity: 1.1, is_sustainable: 'Yes' },
        technical: { rsi: 55, macd_signal: 'Neutral', trend: 'Sideways', technical_signal: 'BUY' },
        forensic: { risk_level: 'LOW', red_flags_count: 1, issues_list: ['Slight increase in NPAs'] },
        sentiment: { sentiment: 'Positive', news_count: 52, fraud_alerts: 0 },
        peer: { peer_growth_diff: 3.2, valuation_premium: 10.0, growth_real: 'Yes' },
        macro: positiveMacroBanking
    },
     'ICICIBANK.NS': {
        stock: mockStocks[4],
        p_tool: { score: 84.2, rating: 'GOOD' },
        fundamental: { revenue_growth: 25.0, profit_margin: 22.1, roe: 18.2, debt_equity: 1.2, is_sustainable: 'Yes' },
        technical: { rsi: 65, macd_signal: 'Bullish', trend: 'Uptrend', technical_signal: 'BUY' },
        forensic: { risk_level: 'LOW', red_flags_count: 0, issues_list: ['None'] },
        sentiment: { sentiment: 'Positive', news_count: 48, fraud_alerts: 0 },
        peer: { peer_growth_diff: 4.5, valuation_premium: 5.0, growth_real: 'Yes' },
        macro: positiveMacroBanking
    },
    'BAJFINANCE.NS': {
        stock: mockStocks[5],
        p_tool: { score: 78.5, rating: 'GOOD' },
        fundamental: { revenue_growth: 30.1, profit_margin: 19.8, roe: 23.5, debt_equity: 3.5, is_sustainable: 'Partial' },
        technical: { rsi: 45, macd_signal: 'Bearish', trend: 'Downtrend', technical_signal: 'SELL' },
        forensic: { risk_level: 'MODERATE', red_flags_count: 2, issues_list: ['High debt levels', 'Aggressive loan provisioning'] },
        sentiment: { sentiment: 'Negative', news_count: 60, fraud_alerts: 1 },
        peer: { peer_growth_diff: 10.2, valuation_premium: 40.0, growth_real: 'No' },
        macro: mixedMacroFinance
    }
};

export const topPicks = [
    {...mockAnalysisData['RELIANCE.NS'].stock, ptool_score: 92.5, recommendation: 'STRONG BUY'},
    {...mockAnalysisData['TCS.NS'].stock, ptool_score: 89.3, recommendation: 'BUY'},
    {...mockAnalysisData['INFY.NS'].stock, ptool_score: 87.1, recommendation: 'BUY'},
    {...mockAnalysisData['HDFCBANK.NS'].stock, ptool_score: 85.8, recommendation: 'BUY'},
    {...mockAnalysisData['ICICIBANK.NS'].stock, ptool_score: 84.2, recommendation: 'BUY'},
]

export const dashboardStats = {
    stocksAnalyzed: 5248,
    buySignals: 89,
    avgPToolScore: 67.8,
    redFlags: 23
}