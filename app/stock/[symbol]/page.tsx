import Graph3D from '@/components/Graph3D';
import StockChart from '@/components/StockChart';
import ConnectionPanel from '@/components/ConnectionPanel';

export default function StockDeepDivePage({ params }: { params: { symbol: string } }) {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="mb-4 text-2xl font-bold">Stock Deep Dive: {params.symbol.toUpperCase()}</h1>
      <div className="grid gap-4 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <StockChart symbol={params.symbol.toUpperCase()} />
        </div>
        <div className="xl:col-span-3">
          <Graph3D title={`Connection Graph: ${params.symbol.toUpperCase()}`} />
        </div>
      </div>
      <div className="mt-4"><ConnectionPanel /></div>
      <p className="mt-4 text-xs text-[#8888AA]">AI-generated analysis. Not investment advice.</p>
      <p className="mt-1 text-xs text-[#8888AA]">This platform is for informational purposes only. Not SEBI registered. Not investment advice. Please consult a SEBI-registered advisor.</p>
    </main>
  );
}
