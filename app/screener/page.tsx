export default function ScreenerPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="text-2xl font-bold">Advanced Screener</h1>
      <p className="mt-2 text-sm text-[#8888AA]">Fundamental + technical + connection-based filters scaffold.</p>
      <section className="mt-4 rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4 text-sm text-[#8888AA]">
        Includes filters for commodity-linked stocks, policy beneficiaries, Granger-causal links, breakout probability, and RRG quadrant.
      </section>
    </main>
  );
}
