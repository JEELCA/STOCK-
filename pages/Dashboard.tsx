import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getDashboardStats, getTopPicks } from '../services/financialApiService';
import { TrendingUp, BarChart2, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Stock } from '../types';

const portfolioData = [
    { name: 'Jan', portfolio: 100, nifty: 100 },
    { name: 'Feb', portfolio: 105, nifty: 102 },
    { name: 'Mar', portfolio: 103, nifty: 101 },
    { name: 'Apr', portfolio: 110, nifty: 105 },
    { name: 'May', portfolio: 115, nifty: 108 },
    { name: 'Jun', portfolio: 122, nifty: 112 },
];

interface DashboardStats {
    stocksAnalyzed: number;
    buySignals: number;
    avgPToolScore: number;
    redFlags: number;
}
type TopPick = Stock & { ptool_score: number; recommendation: string; };

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [picks, setPicks] = useState<TopPick[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statsData, picksData] = await Promise.all([
                    getDashboardStats(),
                    getTopPicks()
                ]);
                setStats(statsData);
                setPicks(picksData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAnalyze = (symbol: string) => {
        navigate(`/analyze/${symbol}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                <span className="ml-4 text-xl">Loading Dashboard...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<BarChart2 className="text-blue-400" />} title="Stocks Analyzed" value={stats?.stocksAnalyzed.toLocaleString() ?? '...'} />
                <StatCard icon={<TrendingUp className="text-green-400" />} title="BUY Signals" value={stats?.buySignals ?? '...'} />
                <StatCard icon={<BarChart className="text-yellow-400" />} title="Avg P-Tool Score" value={stats?.avgPToolScore.toFixed(1) ?? '...'} />
                <StatCard icon={<AlertTriangle className="text-red-400" />} title="Red Flags" value={stats?.redFlags ?? '...'} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-white">Portfolio Performance (vs NIFTY 50)</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={portfolioData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #3a3a3a' }} />
                            <Legend />
                            <Line type="monotone" dataKey="portfolio" stroke="#34d399" strokeWidth={2} name="Your Portfolio" />
                            <Line type="monotone" dataKey="nifty" stroke="#60a5fa" strokeWidth={2} name="NIFTY 50" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-white">AI Top Picks</h2>
                    <div className="space-y-4">
                        {picks?.slice(0, 5).map((pick, index) => (
                            <div key={pick.symbol} 
                                 className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                                 onClick={() => handleAnalyze(pick.symbol)}>
                                <div>
                                    <p className="font-semibold text-white">{index + 1}. {pick.symbol}</p>
                                    <p className="text-sm text-gray-400">{pick.name}</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-cyan-400">{pick.ptool_score.toFixed(1)}</span>
                                     <RecommendationBadge recommendation={pick.recommendation} small={true}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-4">
        <div className="bg-gray-700/50 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const RecommendationBadge: React.FC<{recommendation: string, small?: boolean}> = ({recommendation, small=false}) => {
    const recClasses: Record<string, string> = {
        'STRONG BUY': 'bg-green-500/20 text-green-400',
        'BUY': 'bg-emerald-500/20 text-emerald-400',
        'HOLD': 'bg-yellow-500/20 text-yellow-400',
        'SELL': 'bg-red-500/20 text-red-400',
        'STRONG SELL': 'bg-rose-500/20 text-rose-400',
        'REJECT': 'bg-gray-500/20 text-gray-400',
    };
    const sizeClass = small ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
    return <span className={`inline-block rounded-full font-semibold ml-2 ${sizeClass} ${recClasses[recommendation] || recClasses['REJECT']}`}>{recommendation}</span>;
}

export default Dashboard;