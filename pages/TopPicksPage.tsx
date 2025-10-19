import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopPicks } from '../services/financialApiService';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Stock } from '../types';

const sectors = ['All', 'IT', 'Banking', 'Oil & Gas', 'Finance'];
const recommendations = ['All', 'STRONG BUY', 'BUY'];

type TopPick = Stock & { ptool_score: number; recommendation: string; };

const TopPicksPage: React.FC = () => {
    const [score, setScore] = useState(85);
    const [sector, setSector] = useState('All');
    const [recommendation, setRecommendation] = useState('All');
    const navigate = useNavigate();

    const [allPicks, setAllPicks] = useState<TopPick[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const picksData = await getTopPicks();
                setAllPicks(picksData);
            } catch (error) {
                console.error("Failed to fetch top picks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredPicks = useMemo(() => {
        return allPicks
            .filter(pick => pick.ptool_score >= score)
            .filter(pick => sector === 'All' || pick.sector === sector)
            .filter(pick => recommendation === 'All' || pick.recommendation === recommendation);
    }, [allPicks, score, sector, recommendation]);
    
    const handleAnalyze = (symbol: string) => {
        navigate(`/analyze/${symbol}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                <span className="ml-4 text-xl">Loading Top Picks...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">AI Top Picks</h1>
            
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row gap-4 items-center">
                {/* P-Tool Score Filter */}
                <div className="flex-1 w-full md:w-auto">
                    <label htmlFor="ptool-score" className="block text-sm font-medium text-gray-400 mb-2">Min P-Tool Score: <span className="font-bold text-cyan-400">{score}</span></label>
                    <input
                        id="ptool-score"
                        type="range"
                        min="70"
                        max="100"
                        value={score}
                        onChange={(e) => setScore(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                {/* Sector Filter */}
                <div className="w-full md:w-auto">
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-400 mb-2">Sector</label>
                    <select id="sector" value={sector} onChange={e => setSector(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5">
                        {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                {/* Recommendation Filter */}
                <div className="w-full md:w-auto">
                    <label htmlFor="recommendation" className="block text-sm font-medium text-gray-400 mb-2">Recommendation</label>
                    <select id="recommendation" value={recommendation} onChange={e => setRecommendation(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5">
                        {recommendations.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPicks.map((pick) => (
                    <StockCard key={pick.symbol} pick={pick} onAnalyze={handleAnalyze}/>
                ))}
            </div>
            {filteredPicks.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500">
                    <p>No stocks match your criteria.</p>
                    <p className="text-sm">Try adjusting the filters.</p>
                </div>
            )}
        </div>
    );
};

interface StockCardProps {
    // FIX: Changed from `typeof topPicks[0]` to the locally defined `TopPick` type to resolve the undefined variable error.
    pick: TopPick;
    onAnalyze: (symbol: string) => void;
}

const StockCard: React.FC<StockCardProps> = ({pick, onAnalyze}) => {
     const ptoolColor = pick.ptool_score > 90 ? 'text-green-400' : pick.ptool_score > 85 ? 'text-emerald-400' : 'text-yellow-400';
     const recClasses: Record<string, string> = {
        'STRONG BUY': 'bg-green-500/20 text-green-400',
        'BUY': 'bg-emerald-500/20 text-emerald-400',
    };
    
    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5 flex flex-col justify-between hover:border-cyan-500 transition-colors">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-white">{pick.symbol}</h3>
                        <p className="text-sm text-gray-400">{pick.name}</p>
                    </div>
                     <span className={`text-xl font-bold ${ptoolColor}`}>{pick.ptool_score.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm mb-4">
                    <span className={`px-2.5 py-1 rounded-full font-semibold ${recClasses[pick.recommendation] || 'bg-gray-500/20 text-gray-400'}`}>{pick.recommendation}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{pick.sector}</span>
                </div>
                <p className="text-sm text-gray-300">Current Price: <span className="font-semibold text-white">₹{pick.current_price.toLocaleString()}</span></p>
            </div>
            <button onClick={() => onAnalyze(pick.symbol)} className="mt-4 w-full bg-cyan-600 text-white font-semibold py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center space-x-2">
                <span>Full Analysis</span>
                <ArrowUpRight size={16} />
            </button>
        </div>
    );
};

export default TopPicksPage;