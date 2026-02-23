export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="text-2xl font-bold">Alerts & Watchlist</h1>
      <p className="mt-2 text-sm text-[#8888AA]">Price, volume, breakout, correlation-shift, policy, and geopolitical alert scaffold.</p>
      <section className="mt-4 rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4 text-sm text-[#8888AA]">
        Delivery channels planned: in-app, email digest, push notification, optional Telegram bot.
      </section>
    </main>
  );
}
