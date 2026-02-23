import SectorHeatmap from '@/components/SectorHeatmap';
import BestPerformersTable from '@/components/BestPerformersTable';

export default function SectorsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] p-6 text-[#E0E0FF]">
      <h1 className="mb-4 text-2xl font-bold">Sector Overview</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectorHeatmap />
        <BestPerformersTable />
      </div>
      <p className="mt-4 text-xs text-[#8888AA]">This platform is for informational purposes only. Not SEBI registered. Not investment advice. Please consult a SEBI-registered advisor.</p>
    </main>
  );
}
