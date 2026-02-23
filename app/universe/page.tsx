import Graph3D from '@/components/Graph3D';

export default function UniversePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="text-2xl font-bold">Full 3D Universe View</h1>
      <p className="mb-4 text-sm text-[#8888AA]">Explore 5000+ NSE/BSE stocks as a connection galaxy.</p>
      <Graph3D title="Universe Graph" />
      <p className="mt-4 text-xs text-[#8888AA]">This platform is for informational purposes only. Not SEBI registered. Not investment advice. Please consult a SEBI-registered advisor.</p>
    </main>
  );
}
