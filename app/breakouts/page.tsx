import BreakoutCard from '@/components/BreakoutCard';

const breakouts = [
  { entity: 'TATASTEEL', breakoutType: '52W High Breakout', probability: '73%', cause: 'BB squeeze + copper breakout + sector momentum', timeframe: '1D' },
  { entity: 'DIXON', breakoutType: 'Cup & Handle', probability: '71%', cause: 'PLI incentive + volume buildup + earnings momentum', timeframe: '1W' },
  { entity: 'COCHINSHIP', breakoutType: 'Donchian 55D', probability: '68%', cause: 'Defence order book + FII accumulation', timeframe: '1M' },
];

const categories = [
  'Because of Commodity Moves',
  'Because of Currency Moves',
  'Because of Government Policy',
  'Because of Geopolitical Events',
  'Because of Technical Setups',
  'Because of Earnings Momentum',
  'Because of Sector Rotation',
  'Because of Seasonal Patterns',
  'Because of Supply-Demand Shift',
  'Because of Institutional Activity',
  'Because of Global Cues',
];

export default function BreakoutsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="mb-4 text-2xl font-bold">Breakouts Dashboard</h1>
      <div className="mb-4 flex flex-wrap gap-2 text-xs text-[#8888AA]">
        {['1D', '1W', '1M', '3M', '6M', '1Y'].map((tf) => (
          <span key={tf} className="rounded-md border border-[#1E1E2E] px-2 py-1">{tf}</span>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {breakouts.map((item) => (
          <BreakoutCard key={item.entity} breakout={item} />
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
        <h2 className="mb-2 text-lg font-semibold">Potential Breakouts — Because of...</h2>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div key={category} className="rounded-md border border-[#1E1E2E] bg-[#0A0A0F] p-2 text-sm text-[#8888AA]">{category}</div>
          ))}
        </div>
      </section>

      <p className="mt-4 text-xs text-[#8888AA]">Each potential breakout must include causal reasoning chain and supporting evidence.</p>
      <p className="mt-1 text-xs text-[#8888AA]">This platform is for informational purposes only. Not SEBI registered. Not investment advice. Please consult a SEBI-registered advisor.</p>
    </main>
  );
}
