import BreakoutCard from '@/components/BreakoutCard';

const commodityBreakouts = [
  { entity: 'Copper', breakoutType: 'Bollinger Expansion', probability: '72%', cause: 'China demand expectations', timeframe: '1M' },
  { entity: 'Brent Crude', breakoutType: 'Donchian 20D', probability: '69%', cause: 'Geopolitical risk premium', timeframe: '1W' },
];

export default function CommoditiesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="mb-4 text-2xl font-bold">Commodity Command Center</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {commodityBreakouts.map((item) => (
          <BreakoutCard key={item.entity} breakout={item} />
        ))}
      </div>
      <p className="mt-4 text-xs text-[#8888AA]">This platform is for informational purposes only. Not SEBI registered. Not investment advice. Please consult a SEBI-registered advisor.</p>
    </main>
  );
}
