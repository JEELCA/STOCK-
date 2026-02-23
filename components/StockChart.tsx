export default function StockChart({ symbol }: { symbol: string }) {
  return (
    <div className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
      <h3 className="text-lg font-semibold text-[#E0E0FF]">{symbol} Price Action</h3>
      <div className="mt-4 grid h-64 place-items-center rounded-lg border border-dashed border-[#1E1E2E] text-sm text-[#8888AA]">
        Lightweight-charts candlestick + MA(20/50/200), RSI, MACD scaffold.
      </div>
      <p className="mt-2 text-xs text-[#8888AA]">As of: 15:30 IST (mock)</p>
    </div>
  );
}
