import { GoogleGenAI, Type } from "@google/genai";
import { FullAnalysisData, AIRecommendation } from '../types';

// Aligned with Gemini API coding guidelines.
// The API key is sourced directly from process.env.API_KEY, and we assume it's always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (data: FullAnalysisData): string => {
  return `
You are an expert stock analyst for the Indian stock market (NSE/BSE) with 20 years of experience. Your analysis must be sharp, data-driven, and conclusive.

Stock: ${data.stock.symbol}
Company: ${data.stock.name}
Sector: ${data.stock.sector}

ANALYSIS SUMMARY:
==================

P-Tool Score: ${data.p_tool.score}/100 (${data.p_tool.rating})
This is a proprietary score blending multiple factors. Higher is better.

Fundamental Analysis:
- Revenue Growth: ${data.fundamental.revenue_growth}%
- Profit Margin: ${data.fundamental.profit_margin}%
- ROE: ${data.fundamental.roe}%
- Debt/Equity: ${data.fundamental.debt_equity}
- Sustainability of Growth: ${data.fundamental.is_sustainable}

Technical Analysis:
- RSI (14-day): ${data.technical.rsi}
- MACD Signal: ${data.technical.macd_signal}
- Current Trend: ${data.technical.trend}
- Overall Technical Signal: ${data.technical.technical_signal}

Forensic Analysis (Corporate Governance & Accounting):
- Risk Level: ${data.forensic.risk_level}
- Red Flags Count: ${data.forensic.red_flags_count}
- Key Issues: ${data.forensic.issues_list.join(', ')}

Sentiment Analysis:
- Market Sentiment: ${data.sentiment.sentiment}
- Recent News Volume: ${data.sentiment.news_count} articles
- Fraud Alerts: ${data.sentiment.fraud_alerts}

Peer Comparison:
- Revenue Growth vs Peers: ${data.peer.peer_growth_diff > 0 ? `+${data.peer.peer_growth_diff}` : data.peer.peer_growth_diff}%
- Valuation Premium vs Peers: ${data.peer.valuation_premium}%
- Is Growth Genuine (vs Peers): ${data.peer.growth_real}

Macro Analysis:
- Overall Macro Outlook: ${data.macro.macro_outlook}
- Sector Trend: ${data.macro.sector_outlook.trend}
- Key Sector Drivers: ${data.macro.sector_outlook.drivers.join(', ')}

TASK:
Based on this comprehensive, multi-faceted analysis, provide your final investment recommendation. Be direct, analytical, and actionable. Your output MUST be a JSON object matching the specified schema. Synthesize all the data points to form a coherent investment thesis. For "key_reasoning", provide a concise summary that forms the core of your thesis.
`;
};


export const getAIRecommendation = async (data: FullAnalysisData): Promise<AIRecommendation> => {
  const prompt = generatePrompt(data);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING, enum: ['STRONG BUY', 'BUY', 'HOLD', 'SELL', 'REJECT'] },
            confidence_score: { type: Type.NUMBER, description: "A score from 0 to 100 representing your confidence in the recommendation." },
            key_reasoning: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A few bullet points summarizing the core investment thesis." },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key positive factors and strengths of the company." },
            risks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key risks and potential negative factors." },
            target_price: { type: Type.STRING, description: "A realistic target price based on the analysis." },
            stop_loss: { type: Type.STRING, description: "A suggested stop-loss price to manage risk." },
            investment_horizon: { type: Type.STRING, enum: ['Short Term (3-6mo)', 'Medium Term (6-12mo)', 'Long Term (12+ mo)'], description: "The suggested timeframe for this investment." },
            position_size: { type: Type.STRING, enum: ['Conservative (1-3%)', 'Moderate (3-5%)', 'Aggressive (5-10%)'], description: "Recommended allocation size within a portfolio." }
          },
          required: ['recommendation', 'confidence_score', 'key_reasoning', 'strengths', 'risks', 'target_price', 'stop_loss', 'investment_horizon', 'position_size']
        },
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as AIRecommendation;

  } catch (error) {
    console.error("Error fetching AI recommendation from Gemini:", error);
    // Add more specific error messages based on the error type if possible
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error("The provided API key is invalid. Please check your configuration.");
    }
    throw new Error("Failed to get a valid recommendation from the AI engine. Please try again later.");
  }
};
