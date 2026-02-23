export type TickerItem = {
  label: string;
  value: string;
  change: string;
};

const defaultTicker: TickerItem[] = [
  { label: 'NIFTY50', value: '24,850.30', change: '+0.84%' },
  { label: 'SENSEX', value: '81,430.22', change: '+0.72%' },
  { label: 'BANK NIFTY', value: '51,220.15', change: '+1.05%' },
  { label: 'INDIA VIX', value: '13.90', change: '-2.31%' },
  { label: 'USD/INR', value: '83.46', change: '+0.18%' },
];

export default function MarketTicker({ items = defaultTicker }: { items?: TickerItem[] }) {
  return (
    <div className="rounded-xl border border-[#1E1E2E] bg-[#12121A] px-4 py-3">
      <div className="flex flex-wrap gap-4 text-sm">
        {items.map((item) => (
          <div key={item.label} className="font-mono text-[#E0E0FF]">
            <span className="mr-2 text-[#8888AA]">{item.label}</span>
            <span>{item.value}</span>
            <span className={`ml-2 ${item.change.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
