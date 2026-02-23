const sectors = [
  { name: 'Banking', ret: '+1.2%' },
  { name: 'IT', ret: '+0.9%' },
  { name: 'Pharma', ret: '-0.3%' },
  { name: 'Auto', ret: '+0.5%' },
  { name: 'Metal', ret: '+2.4%' },
  { name: 'Energy', ret: '-0.6%' },
];

export default function SectorHeatmap() {
  return (
    <section className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
      <h3 className="mb-3 text-lg font-semibold text-[#E0E0FF]">Sector Heatmap (Treemap scaffold)</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {sectors.map((sector) => (
          <div key={sector.name} className="rounded-lg border border-[#1E1E2E] bg-[#0A0A0F] p-3">
            <p className="text-sm text-[#E0E0FF]">{sector.name}</p>
            <p className={`text-xs ${sector.ret.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>{sector.ret}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
