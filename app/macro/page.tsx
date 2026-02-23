const indiaMacro = [
  { key: 'GDP Growth', value: '7.2%', trend: 'Improving' },
  { key: 'CPI Inflation', value: '4.8%', trend: 'Stable' },
  { key: 'Repo Rate', value: '6.50%', trend: 'Neutral' },
  { key: '10Y G-Sec', value: '7.09%', trend: 'Rising' },
  { key: 'FII Flow', value: '₹+2,130Cr', trend: 'Improving' },
  { key: 'India VIX', value: '13.9', trend: 'Cooling' },
];

export default function MacroPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="mb-4 text-2xl font-bold">Macro Dashboard</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {indiaMacro.map((item) => (
          <article key={item.key} className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
            <p className="text-xs text-[#8888AA]">{item.key}</p>
            <p className="font-mono text-xl">{item.value}</p>
            <p className="text-xs text-[#22D3EE]">{item.trend}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-[#8888AA]">As of: 15:30 IST (mock). Show timestamp for every metric in production.</p>
      <p className="mt-1 text-xs text-[#8888AA]">This platform is for informational purposes only. Not SEBI registered. Not investment advice. Please consult a SEBI-registered advisor.</p>
    </main>
  );
}
