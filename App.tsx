import React from 'react';
import { HashRouter, Navigate, NavLink, Route, Routes, useParams } from 'react-router-dom';
import {
  Bell,
  ChartColumn,
  Compass,
  Cpu,
  Globe,
  LayoutDashboard,
  LineChart,
  Search,
  Target,
} from 'lucide-react';

import HomePage from '@/app/page';
import UniversePage from '@/app/universe/page';
import StockDeepDivePage from '@/app/stock/[symbol]/page';
import SectorsPage from '@/app/sectors/page';
import CommoditiesPage from '@/app/commodities/page';
import BreakoutsPage from '@/app/breakouts/page';
import MacroPage from '@/app/macro/page';
import GeopoliticsPage from '@/app/geopolitics/page';
import ScreenerPage from '@/app/screener/page';
import StrategiesPage from '@/app/strategies/page';
import AlertsPage from '@/app/alerts/page';
import ConnectionsPage from '@/app/connections/page';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-[#0A0A0F] text-[#E0E0FF]">
        <aside className="w-72 border-r border-[#1E1E2E] bg-[#12121A] p-4">
          <h1 className="mb-6 text-xl font-bold">🌌 Stock Universe India</h1>
          <nav className="flex flex-col gap-2 text-sm">
            <NavItem to="/" icon={<LayoutDashboard size={18} />}>Dashboard</NavItem>
            <NavItem to="/universe" icon={<Globe size={18} />}>Universe</NavItem>
            <NavItem to="/sectors" icon={<ChartColumn size={18} />}>Sectors</NavItem>
            <NavItem to="/commodities" icon={<LineChart size={18} />}>Commodities</NavItem>
            <NavItem to="/macro" icon={<Cpu size={18} />}>Macro</NavItem>
            <NavItem to="/breakouts" icon={<Target size={18} />}>Breakouts</NavItem>
            <NavItem to="/connections" icon={<Compass size={18} />}>Connections</NavItem>
            <NavItem to="/strategies" icon={<ChartColumn size={18} />}>Strategies</NavItem>
            <NavItem to="/screener" icon={<Search size={18} />}>Screener</NavItem>
            <NavItem to="/geopolitics" icon={<Globe size={18} />}>Geopolitics</NavItem>
            <NavItem to="/alerts" icon={<Bell size={18} />}>Alerts</NavItem>
          </nav>
        </aside>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/universe" element={<UniversePage />} />
            <Route path="/stock/:symbol" element={<StockSymbolRoute />} />
            <Route path="/sectors" element={<SectorsPage />} />
            <Route path="/commodities" element={<CommoditiesPage />} />
            <Route path="/breakouts" element={<BreakoutsPage />} />
            <Route path="/macro" element={<MacroPage />} />
            <Route path="/geopolitics" element={<GeopoliticsPage />} />
            <Route path="/strategies" element={<StrategiesPage />} />
            <Route path="/screener" element={<ScreenerPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

function StockSymbolRoute() {
  const params = useParams();
  return <StockDeepDivePage params={{ symbol: params.symbol ?? 'TATASTEEL' }} />;
}

function NavItem({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-3 py-2 ${
          isActive ? 'bg-[#6366F1]/20 text-[#22D3EE]' : 'text-[#8888AA] hover:bg-[#1E1E2E] hover:text-[#E0E0FF]'
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
}

export default App;
