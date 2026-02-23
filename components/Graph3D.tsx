'use client';

import { cameraPresets, graphLodConfig, layoutModes, sectorColors } from '@/lib/graphConfig';

const nodeLegend = [
  { type: 'Stock', shape: 'Sphere' },
  { type: 'Commodity', shape: 'Cube' },
  { type: 'Sector', shape: 'Translucent Dodecahedron' },
  { type: 'Macro', shape: 'Diamond' },
  { type: 'Currency', shape: 'Cylinder' },
  { type: 'Policy', shape: 'Star' },
  { type: 'Geopolitical Event', shape: 'Spiked Sphere' },
  { type: 'Theme', shape: 'Torus' },
  { type: 'Global Index', shape: 'Pyramid' },
];

export default function Graph3D({ title = '3D Universe Graph' }: { title?: string }) {
  return (
    <section className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
      <h3 className="text-lg font-semibold text-[#E0E0FF]">{title}</h3>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <div className="rounded-lg border border-[#1E1E2E] bg-[#0A0A0F] p-3 text-xs text-[#8888AA]">
          <p className="mb-2 text-[#E0E0FF]">Node legend (visual contract)</p>
          <ul className="space-y-1">
            {nodeLegend.map((node) => (
              <li key={node.type}>
                {node.type}: {node.shape}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[#1E1E2E] bg-[#0A0A0F] p-3 text-xs text-[#8888AA]">
          <p className="mb-2 text-[#E0E0FF]">Performance + LOD</p>
          <ul className="space-y-1">
            <li>Desktop initial nodes: {graphLodConfig.initialUniverseLoad.desktopDefault}</li>
            <li>Mobile initial nodes: {graphLodConfig.initialUniverseLoad.mobileDefault}</li>
            <li>LOD far cutoff: {graphLodConfig.lodDistanceBreakpoints.far}</li>
            <li>Edge width range: {graphLodConfig.edgeWidthRange[0]}px - {graphLodConfig.edgeWidthRange[1]}px</li>
          </ul>
        </div>

        <div className="rounded-lg border border-[#1E1E2E] bg-[#0A0A0F] p-3 text-xs text-[#8888AA]">
          <p className="mb-2 text-[#E0E0FF]">Interaction presets</p>
          <ul className="space-y-1">
            {cameraPresets.slice(0, 4).map((preset) => (
              <li key={preset.id}>{preset.label}</li>
            ))}
          </ul>
          <p className="mt-2">Layouts: {layoutModes.join(', ')}</p>
        </div>
      </div>

      <div className="mt-3 grid h-[420px] place-items-center rounded-lg border border-dashed border-[#1E1E2E] text-sm text-[#8888AA]">
        react-force-graph-3d + custom Three.js shaders scaffold. Includes glow by day change, edge particles by influence direction,
        and camera fly-to interaction contracts.
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {Object.entries(sectorColors)
          .slice(0, 8)
          .map(([sector, color]) => (
            <span key={sector} className="rounded-md border border-[#1E1E2E] px-2 py-1 text-[#E0E0FF]">
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {sector}
            </span>
          ))}
      </div>

      <p className="mt-2 text-xs text-[#8888AA]">
        Mobile behavior: degrade to 2D graph, reduce nodes to top 200, disable post-processing, and use bottom sheet details.
      </p>
    </section>
  );
}
