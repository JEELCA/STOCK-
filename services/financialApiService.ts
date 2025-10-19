import { FullAnalysisData, Stock } from '../types';
import { mockAnalysisData, mockStocks, topPicks, dashboardStats } from '../data/mockData';

// Using Alpha Vantage API. A free API key can be obtained from their website.
// The key should be stored in an environment variable for security.
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo'; // 'demo' key is for demonstration purposes
const BASE_URL = 'https://www.alphavantage.co/query';

// --- Helper function to handle API requests and errors ---
const fetchApi = async (params: Record<string, string>) => {
    const query = new URLSearchParams({ apikey: API_KEY, ...params }).toString();
    const response = await fetch(`${BASE_URL}?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data from the financial API.');
    }
    const data = await response.json();
    // Handle API-specific error messages and rate limiting notes
    if (data['Error Message']) {
        throw new Error(data['Error Message']);
    }
    if (data['Note']) {
        console.warn('Alpha Vantage API Info:', data['Note']);
        throw new Error('API call frequency limit reached. Please try again in a moment.');
    }
    return data;
};

/**
 * Fetches the complete analysis data for a given stock symbol.
 * Merges real-time data from Alpha Vantage with specialized mock data.
 */
export const getAnalysisData = async (symbol: string): Promise<FullAnalysisData> => {
    console.log(`Fetching REAL analysis data for ${symbol}...`);

    // Alpha Vantage uses symbols without the .NS suffix (e.g., RELIANCE instead of RELIANCE.NS)
    const apiSymbol = symbol.split('.')[0];

    // Fetch fundamental (OVERVIEW) and price (GLOBAL_QUOTE) data in parallel
    const [overviewData, quoteData] = await Promise.all([
        fetchApi({ function: 'OVERVIEW', symbol: apiSymbol }),
        fetchApi({ function: 'GLOBAL_QUOTE', symbol: apiSymbol })
    ]);
    
    // Use mock data as a base for specialized fields not available in free APIs
    // (P-Tool, Forensic, Sentiment, Peer, Macro).
    const baseAnalysis = mockAnalysisData[symbol.toUpperCase()];
    if (!baseAnalysis) {
        throw new Error(`Stock analysis profile for "${symbol}" not found.`);
    }

    // Extract and parse real data from the API responses
    const globalQuote = quoteData['Global Quote'];
    const currentPrice = globalQuote && globalQuote['05. price'] ? parseFloat(globalQuote['05. price']) : baseAnalysis.stock.current_price;
    const marketCap = overviewData.MarketCapitalization && overviewData.MarketCapitalization !== 'None' ? parseInt(overviewData.MarketCapitalization) : baseAnalysis.stock.market_cap;
    const revenueGrowth = overviewData.QuarterlyRevenueGrowthYOY ? parseFloat(overviewData.QuarterlyRevenueGrowthYOY) * 100 : baseAnalysis.fundamental.revenue_growth;
    const profitMargin = overviewData.ProfitMargin ? parseFloat(overviewData.ProfitMargin) * 100 : baseAnalysis.fundamental.profit_margin;
    const roe = overviewData.ReturnOnEquityTTM ? parseFloat(overviewData.ReturnOnEquityTTM) * 100 : baseAnalysis.fundamental.roe;
    const debtEquity = overviewData.DebtToEquity ? parseFloat(overviewData.DebtToEquity) : baseAnalysis.fundamental.debt_equity;

    // Construct the final data object, overwriting mock data with real data where available
    const mergedData: FullAnalysisData = {
        ...baseAnalysis,
        stock: {
            symbol: symbol.toUpperCase(),
            name: overviewData.Name || baseAnalysis.stock.name,
            sector: overviewData.Sector || baseAnalysis.stock.sector,
            market_cap: marketCap,
            current_price: currentPrice
        },
        fundamental: {
            ...baseAnalysis.fundamental,
            revenue_growth: parseFloat(revenueGrowth.toFixed(2)),
            profit_margin: parseFloat(profitMargin.toFixed(2)),
            roe: parseFloat(roe.toFixed(2)),
            debt_equity: parseFloat(debtEquity.toFixed(2)),
        }
    };

    return mergedData;
};


// The functions below will continue to use mock data. A real-world application
// would require a more complex backend to generate "Top Picks" and aggregate statistics.
// The core feature of analyzing a single stock is now using real data.

/**
 * Returns a list of stocks available for analysis.
 */
export const getAvailableStocks = async (): Promise<Stock[]> => {
    await new Promise(resolve => setTimeout(resolve, 100)); // simulate small delay
    return mockStocks;
};

/**
 * Fetches the top stock picks. In a real app, this would be a dedicated backend endpoint.
 */
export const getTopPicks = async (): Promise<(Stock & { ptool_score: number; recommendation: string; })[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return topPicks;
};

/**
 * Fetches dashboard statistics. In a real app, this would be a dedicated backend endpoint.
 */
export const getDashboardStats = async (): Promise<typeof dashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return dashboardStats;
};
