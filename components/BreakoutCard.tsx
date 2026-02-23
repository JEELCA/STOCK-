export type Breakout = {
  entity: string;
  breakoutType: string;
  probability: string;
  cause: string;
  timeframe: string;
};

export default function BreakoutCard({ breakout }: { breakout: Breakout }) {
  return (
    <article className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
      <p className="text-xs text-[#8888AA]">{breakout.timeframe}</p>
      <h3 className="text-lg font-semibold text-[#E0E0FF]">{breakout.entity}</h3>
      <p className="text-sm text-[#22D3EE]">{breakout.breakoutType}</p>
      <p className="mt-1 text-sm text-[#10B981]">Probability: {breakout.probability}</p>
      <p className="mt-2 text-sm text-[#8888AA]">Because of: {breakout.cause}</p>
    </article>
  );
}
