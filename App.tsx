
import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, TrendingUp, BotMessageSquare } from 'lucide-react';
import AnalysisPage from './pages/AnalysisPage';
import Dashboard from './pages/Dashboard';
import TopPicksPage from './pages/TopPicksPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-900 text-gray-200">
        <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
          <div className="flex items-center mb-8">
            <BotMessageSquare className="h-8 w-8 text-cyan-400 mr-3" />
            <h1 className="text-xl font-bold text-white">Stock AI Agent</h1>
          </div>
          <nav className="flex flex-col space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />}>Dashboard</NavItem>
            <NavItem to="/analyze" icon={<Target size={20} />}>Analyze</NavItem>
            <NavItem to="/top-picks" icon={<TrendingUp size={20} />}>Top Picks</NavItem>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<AnalysisPage />} />
            <Route path="/analyze/:symbol" element={<AnalysisPage />} />
            <Route path="/top-picks" element={<TopPicksPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, children }) => {
  const baseClasses = "flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200";
  const inactiveClasses = "text-gray-400 hover:bg-gray-700 hover:text-white";
  const activeClasses = "bg-cyan-500/20 text-cyan-400 font-semibold";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};


export default App;
