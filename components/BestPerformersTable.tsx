const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y'] as const;

const demoRows = [
  { rank: 1, symbol: 'COCHINSHIP', sector: 'Defence', price: '₹1,245', returnPct: '+45.2%', volumeRatio: '3.5x', deliveryPct: '72%', rsi14: 78 },
  { rank: 2, symbol: 'IRFC', sector: 'Infra', price: '₹168', returnPct: '+42.8%', volumeRatio: '2.8x', deliveryPct: '65%', rsi14: 82 },
  { rank: 3, symbol: 'TATASTEEL', sector: 'Metal', price: '₹142.5', returnPct: '+38.1%', volumeRatio: '2.4x', deliveryPct: '62%', rsi14: 74 },
];

export default function BestPerformersTable() {
  return (
    <section className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
      <div className="mb-3 flex flex-wrap gap-2 text-xs text-[#8888AA]">
        {timeframes.map((timeframe) => (
          <span key={timeframe} className="rounded-md border border-[#1E1E2E] px-2 py-1">{timeframe}</span>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm text-[#E0E0FF]">
          <thead className="text-[#8888AA]">
            <tr>
              <th>Rank</th><th>Stock</th><th>Sector</th><th>Price</th><th>Return%</th><th>Vol Ratio</th><th>Del%</th><th>RSI(14)</th>
            </tr>
          </thead>
          <tbody>
            {demoRows.map((row) => (
              <tr key={row.symbol} className="border-t border-[#1E1E2E]">
                <td>{row.rank}</td><td>{row.symbol}</td><td>{row.sector}</td><td>{row.price}</td><td>{row.returnPct}</td><td>{row.volumeRatio}</td><td>{row.deliveryPct}</td><td>{row.rsi14}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[#8888AA]">Supports filters by market cap, sector, index membership, F&O flag, and liquidity thresholds.</p>
    </section>
  );
}
