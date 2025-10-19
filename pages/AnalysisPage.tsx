import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Loader2, CheckCircle, XCircle, BrainCircuit, BarChart, LineChart, ShieldCheck, Newspaper, Users, Globe, Info, TrendingUp, TrendingDown, Minus, Building2, Activity, Gauge } from 'lucide-react';
import { getAnalysisData } from '../services/financialApiService';
import { getAIRecommendation } from '../services/geminiService';
import { AIRecommendation, FullAnalysisData, AnalysisStage, ALL_STAGES, MacroData, EconomicIndicator } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

const AnalysisPage: React.FC = () => {
    const { symbol: paramSymbol } = useParams<{ symbol?: string }>();
    const navigate = useNavigate();
    const [inputSymbol, setInputSymbol] = useState(paramSymbol || '');
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string | null>(null);
    const [analysisData, setAnalysisData] = useState<FullAnalysisData | null>(null);
    const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation | null>(null);
    const [currentStage, setCurrentStage] = useState<AnalysisStage | null>(null);
    const [completedStages, setCompletedStages] = useState<Set<AnalysisStage>>(new Set());

    useEffect(() => {
        const analyzeSymbol = async (symbolToAnalyze: string) => {
            const stockSymbol = symbolToAnalyze.toUpperCase();
            
            setStatus('loading');
            setError(null);
            setAnalysisData(null);
            setAiRecommendation(null);
            setCompletedStages(new Set());
            
            try {
                // Simulate fetching data and running preliminary analyses
                let stageIndex = 0;
                const runStage = async (stage: AnalysisStage, duration: number) => {
                    setCurrentStage(stage);
                    await new Promise(resolve => setTimeout(resolve, duration));
                    setCompletedStages(prev => new Set(prev).add(stage));
                };

                await runStage(ALL_STAGES[stageIndex++], 300); // P-Tool
                await runStage(ALL_STAGES[stageIndex++], 300); // Fundamental
                await runStage(ALL_STAGES[stageIndex++], 300); // Technical
                
                // Fetch all financial data
                const data = await getAnalysisData(stockSymbol);
                setAnalysisData(data);

                await runStage(ALL_STAGES[stageIndex++], 300); // Forensic
                await runStage(ALL_STAGES[stageIndex++], 300); // Sentiment
                await runStage(ALL_STAGES[stageIndex++], 300); // Peer
                await runStage(ALL_STAGES[stageIndex++], 300); // Macro

                // The final and most important stage: getting the AI recommendation
                setCurrentStage(ALL_STAGES[stageIndex]);
                const recommendation = await getAIRecommendation(data);
                setAiRecommendation(recommendation);
                setCompletedStages(prev => new Set(prev).add(ALL_STAGES[stageIndex]));
                
                setStatus('success');
            } catch (err) {
                setStatus('error');
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setCurrentStage(null);
            }
        };

        if (paramSymbol) {
            setInputSymbol(paramSymbol);
            analyzeSymbol(paramSymbol);
        } else {
            setStatus('idle');
        }
    }, [paramSymbol]);

    const handleManualAnalysis = () => {
        if (inputSymbol && inputSymbol.trim() !== '') {
            navigate(`/analyze/${inputSymbol.trim().toUpperCase()}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-white">Stock Analysis Engine</h1>
            
            <div className="flex gap-2">
                <input 
                    type="text"
                    value={inputSymbol}
                    onChange={(e) => setInputSymbol(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleManualAnalysis()}
                    placeholder="Enter stock symbol (e.g., RELIANCE.NS)"
                    className="flex-grow bg-gray-800 border border-gray-700 text-white text-lg rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-3.5"
                />
                <button 
                    onClick={handleManualAnalysis}
                    disabled={status === 'loading' || !inputSymbol.trim()}
                    className="bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : <Search />}
                    <span className="ml-2">Analyze</span>
                </button>
            </div>

            {status === 'loading' && <LoadingState currentStage={currentStage} completedStages={completedStages} />}
            {status === 'error' && <ErrorState message={error} />}
            {status === 'success' && analysisData && aiRecommendation && (
                <AnalysisResult data={analysisData} recommendation={aiRecommendation} />
            )}
             {status === 'idle' && !paramSymbol && (
                 <div className="text-center py-12 text-gray-500 bg-gray-800/50 rounded-lg border border-gray-700">
                    <p className="text-lg">Enter a stock symbol to begin analysis.</p>
                </div>
             )}
        </div>
    );
};

const LoadingState: React.FC<{currentStage: AnalysisStage | null, completedStages: Set<AnalysisStage>}> = ({currentStage, completedStages}) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-center space-x-3 mb-4">
            <BrainCircuit className="text-cyan-400 h-8 w-8" />
            <h2 className="text-xl font-semibold text-white">AI Analysis in Progress...</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ALL_STAGES.map(stage => (
                <div key={stage} className="flex items-center space-x-2 p-2 bg-gray-700/50 rounded-lg">
                    {completedStages.has(stage) ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                        <Loader2 className={`h-5 w-5 ${currentStage === stage ? 'text-cyan-400 animate-spin' : 'text-gray-500'}`} />
                    )}
                    <span className={`text-sm ${completedStages.has(stage) ? 'text-gray-300' : 'text-gray-500'}`}>{stage}</span>
                </div>
            ))}
        </div>
    </div>
);

const ErrorState: React.FC<{message: string | null}> = ({message}) => (
     <div className="bg-red-900/20 border border-red-500/50 text-red-300 p-4 rounded-lg flex items-center space-x-3">
        <XCircle />
        <span>{message || 'An unexpected error occurred.'}</span>
    </div>
);

const AnalysisResult: React.FC<{data: FullAnalysisData, recommendation: AIRecommendation}> = ({data, recommendation}) => {
    const [activeTab, setActiveTab] = useState('Summary');
    
    const getRecommendationClasses = (rec: string) => {
        const base = "px-4 py-2 text-2xl font-bold rounded-lg inline-block";
        switch(rec) {
            case 'STRONG BUY': return `${base} bg-green-500/20 text-green-300`;
            case 'BUY': return `${base} bg-emerald-500/20 text-emerald-300`;
            case 'HOLD': return `${base} bg-yellow-500/20 text-yellow-300`;
            case 'SELL': return `${base} bg-red-500/20 text-red-300`;
            case 'REJECT': return `${base} bg-gray-500/20 text-gray-400`;
            default: return `${base} bg-gray-600 text-gray-200`;
        }
    };
    
    const tabs = [
        { name: 'Summary', icon: <Info/> },
        { name: 'Fundamental', icon: <BarChart/> },
        { name: 'Technical', icon: <LineChart/> },
        { name: 'Forensic', icon: <ShieldCheck/> },
        { name: 'Sentiment', icon: <Newspaper/> },
        { name: 'Peer', icon: <Users/> },
        { name: 'Macro', icon: <Globe/> },
    ];
    
    const renderTabContent = () => {
        const {fundamental, technical, forensic, sentiment, peer, macro} = data;
        switch(activeTab) {
            case 'Fundamental': return <MetricTable title="Fundamental Analysis" data={fundamental} />;
            case 'Technical': return <MetricTable title="Technical Analysis" data={technical} />;
            case 'Forensic': return <MetricTable title="Forensic Checks" data={forensic} />;
            case 'Sentiment': return <MetricTable title="Sentiment Analysis" data={sentiment} />;
            case 'Peer': return <MetricTable title="Peer Comparison" data={peer} />;
            case 'Macro': return <MacroAnalysisView data={macro} />;
            default: return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard title="Key Reasoning" items={recommendation.key_reasoning} />
                    <InfoCard title="Strengths" items={recommendation.strengths} color="green" />
                    <InfoCard title="Risks" items={recommendation.risks} color="red" />
                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatItem title="Target Price" value={recommendation.target_price} />
                        <StatItem title="Stop Loss" value={recommendation.stop_loss} />
                        <StatItem title="Horizon" value={recommendation.investment_horizon} />
                        <StatItem title="Position Size" value={recommendation.position_size} />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <header className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-white">{data.stock.name} ({data.stock.symbol})</h2>
                        <p className="text-lg text-gray-400">{data.stock.sector}</p>
                    </div>
                     <div className="mt-4 md:mt-0 text-right">
                         <p className="text-3xl font-bold text-white">₹{data.stock.current_price.toLocaleString()}</p>
                         <p className="text-md text-gray-400">P-Tool Score: <span className="font-semibold text-cyan-400">{data.p_tool.score}/100 ({data.p_tool.rating})</span></p>
                    </div>
                </div>
            </header>
            
            <div className="p-6 bg-gray-800/50">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                        <div className={getRecommendationClasses(recommendation.recommendation)}>{recommendation.recommendation}</div>
                        <div className="mt-4 text-sm text-gray-400">Confidence:</div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                            <div className="bg-cyan-500 h-2.5 rounded-full" style={{width: `${recommendation.confidence_score}%`}}></div>
                        </div>
                         <p className="text-center font-bold text-lg text-cyan-300 mt-1">{recommendation.confidence_score}%</p>
                    </div>
                    <div className="md:w-2/3">
                         <h3 className="font-semibold text-lg text-white mb-2">AI Verdict</h3>
                         <p className="text-gray-300">{recommendation.key_reasoning[0]}</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700">
                 <div className="flex border-b border-gray-700 bg-gray-800 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab.name} onClick={() => setActiveTab(tab.name)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.name ? 'border-b-2 border-cyan-500 text-cyan-400' : 'text-gray-400 hover:bg-gray-700/50'}`}>
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </div>
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

const InfoCard: React.FC<{title: string; items: string[], color?: 'green' | 'red'}> = ({ title, items, color }) => {
    const titleColor = color === 'green' ? 'text-green-400' : color === 'red' ? 'text-red-400' : 'text-cyan-400';
    const bulletColor = color === 'green' ? 'text-green-500' : color === 'red' ? 'text-red-500' : 'text-cyan-500';

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className={`font-semibold mb-2 ${titleColor}`}>{title}</h4>
            <ul className="space-y-1.5">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className={`mr-2 mt-1 flex-shrink-0 ${bulletColor}`}>&#8226;</span>
                        <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const StatItem: React.FC<{title:string; value: string}> = ({title, value}) => (
    <div className="bg-gray-700/50 p-3 rounded-lg text-center">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="font-semibold text-white">{value}</p>
    </div>
)

const MetricTable: React.FC<{title: string, data: object}> = ({ title, data }) => (
    <div>
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-400 capitalize">{key.replace(/_/g, ' ')}</p>
                    <p className="font-semibold text-white text-lg">{Array.isArray(value) ? value.join(', ') : value.toString()}</p>
                </div>
            ))}
        </div>
    </div>
);

const TrendIcon: React.FC<{ trend: 'IMPROVING' | 'DECLINING' | 'STABLE' }> = ({ trend }) => {
  switch (trend) {
    case 'IMPROVING': return <TrendingUp className="h-4 w-4 text-green-400" />;
    case 'DECLINING': return <TrendingDown className="h-4 w-4 text-red-400" />;
    default: return <Minus className="h-4 w-4 text-yellow-400" />;
  }
};

const ImpactBadge: React.FC<{ impact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' }> = ({ impact }) => {
    const classes = {
        POSITIVE: 'bg-green-500/20 text-green-400',
        NEUTRAL: 'bg-yellow-500/20 text-yellow-400',
        NEGATIVE: 'bg-red-500/20 text-red-400',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${classes[impact]}`}>{impact}</span>;
}

const MacroStatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; children?: React.ReactNode; }> = ({ title, value, icon, children }) => (
  <div className="bg-gray-700/50 p-4 rounded-lg">
    <div className="flex items-center space-x-3">
      <div className="bg-gray-900/50 p-2 rounded-md">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
    {children && <div className="mt-2 pl-12">{children}</div>}
  </div>
);


const MacroAnalysisView: React.FC<{ data: MacroData }> = ({ data }) => {
    const { economic_indicators, market_conditions, sector_outlook, macro_outlook } = data;

    const outlookClasses = {
        POSITIVE: 'bg-green-500/20 text-green-300 border-green-500/30',
        NEUTRAL: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        NEGATIVE: 'bg-red-500/20 text-red-300 border-red-500/30',
    };

    return (
        <div className="space-y-6">
             <div className={`p-4 rounded-lg border flex items-center space-x-3 ${outlookClasses[macro_outlook]}`}>
                <BrainCircuit className="h-6 w-6" />
                <div>
                    <h3 className="font-bold text-lg">Overall Macro Outlook: {macro_outlook}</h3>
                    <p className="text-sm">The current macroeconomic environment is considered {macro_outlook.toLowerCase()} for this sector.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                     <h3 className="text-lg font-semibold text-white flex items-center"><Building2 className="mr-2 h-5 w-5 text-cyan-400"/> Economic Indicators</h3>
                    <MacroStatCard title="GDP Growth" value={economic_indicators.gdp_growth.value} icon={<TrendingUp className="text-cyan-400" />}>
                        <div className="flex items-center space-x-2 text-sm">
                            <TrendIcon trend={economic_indicators.gdp_growth.trend} /> 
                            <ImpactBadge impact={economic_indicators.gdp_growth.impact}/>
                        </div>
                    </MacroStatCard>
                    <MacroStatCard title="Inflation Rate" value={economic_indicators.inflation_rate.value} icon={<Activity className="text-cyan-400" />}>
                         <div className="flex items-center space-x-2 text-sm">
                            <TrendIcon trend={economic_indicators.inflation_rate.trend} /> 
                            <ImpactBadge impact={economic_indicators.inflation_rate.impact}/>
                        </div>
                    </MacroStatCard>
                     <MacroStatCard title="Manufacturing PMI" value={economic_indicators.manufacturing_pmi.value} icon={<Gauge className="text-cyan-400" />}>
                         <div className="flex items-center space-x-2 text-sm">
                            <TrendIcon trend={economic_indicators.manufacturing_pmi.trend} /> 
                            <ImpactBadge impact={economic_indicators.manufacturing_pmi.impact}/>
                        </div>
                    </MacroStatCard>
                </div>

                <div className="md:col-span-2 space-y-4">
                     <h3 className="text-lg font-semibold text-white flex items-center"><Globe className="mr-2 h-5 w-5 text-cyan-400"/> Market & Sector</h3>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-gray-300">Overall Market Conditions</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <StatItem title="Trend" value={market_conditions.trend} />
                            <StatItem title="Volatility" value={market_conditions.volatility} />
                            <StatItem title="Sentiment" value={market_conditions.sentiment} />
                        </div>
                    </div>
                     <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 text-gray-300">Sector Outlook: {sector_outlook.outlook}</h4>
                        <div className="flex items-center space-x-2 text-sm mb-4">
                            <span className="text-gray-400">Current Trend:</span>
                            <span className="font-semibold px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-md">{sector_outlook.trend}</span>
                        </div>
                        <h5 className="text-sm font-semibold text-gray-400 mb-2">Key Drivers:</h5>
                         <ul className="space-y-1.5">
                            {sector_outlook.drivers.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className={`mr-2 mt-1 flex-shrink-0 text-cyan-500`}>&#8226;</span>
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AnalysisPage;
