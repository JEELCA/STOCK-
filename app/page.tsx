import MarketTicker from '@/components/MarketTicker';
import SearchCommand from '@/components/SearchCommand';
import BestPerformersTable from '@/components/BestPerformersTable';
import SectorHeatmap from '@/components/SectorHeatmap';
import BreakoutCard from '@/components/BreakoutCard';
import Graph3D from '@/components/Graph3D';

const breakout = {
  entity: 'TATASTEEL',
  breakoutType: 'Potential Breakout (5D Horizon)',
  probability: '73%',
  cause: 'BB squeeze + copper breakout + sector momentum',
  timeframe: '1D',
};

const connectionSpotlights = [
  'TATASTEEL ↔ Copper: corr shifted 0.30 → 0.70 (3M)',
  'IT Basket ↔ USD/INR: corr shifted 0.45 → 0.62 (1M)',
  'Airlines ↔ Crude: corr shifted -0.35 → -0.68 (1W)',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="mb-2 text-3xl font-bold">Stock Universe India</h1>
      <p className="mb-4 text-[#8888AA]">Every stock lives in a universe of connections. We map the entire universe for you.</p>
      <MarketTicker />

      <section className="mt-4 rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
        <h2 className="text-lg font-semibold">🤖 AI Market Pulse</h2>
        <p className="mt-2 text-sm text-[#8888AA]">
          Indian markets remain risk-on with stronger GST prints, commodity-led metal momentum, and FII re-entry.
          The sharpest connection shift today is Airlines ↔ Crude as energy volatility expanded.
        </p>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <SearchCommand />
        <BreakoutCard breakout={breakout} />
      </div>

      <div className="mt-4"><Graph3D title="Today's Hottest Connections" /></div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <BestPerformersTable />
        <SectorHeatmap />
      </div>

      <section className="mt-4 rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
        <h2 className="mb-2 text-lg font-semibold">🌐 Connection Spotlight</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[#8888AA]">
          {connectionSpotlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
        <h2 className="mb-2 text-lg font-semibold">📊 Market Breadth Dashboard (Preview)</h2>
        <p className="text-sm text-[#8888AA]">Advance/Decline, 52W highs vs lows, % above 50DMA/200DMA, FII/DII and India VIX trend panels are scaffolded for live wiring.</p>
      </section>

      <p className="mt-6 text-xs text-[#8888AA]">AI-generated analysis. Not investment advice.</p>
      <p className="mt-1 text-xs text-[#8888AA]">This platform is for informational purposes only. Not SEBI registered. Not investment advice. Please consult a SEBI-registered advisor.</p>
    </main>
  );
}
