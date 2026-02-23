export type CameraPreset = {
  id: string;
  label: string;
  description: string;
};

export const sectorColors: Record<string, string> = {
  'Banking & Finance': '#3B82F6',
  'IT & Technology': '#06B6D4',
  'Pharma & Healthcare': '#10B981',
  'Auto & Auto Components': '#F97316',
  'Metals & Mining': '#94A3B8',
  'Energy & Oil Gas': '#EF4444',
  FMCG: '#EAB308',
  'Realty & Construction': '#A16207',
  'Infrastructure & Capital Goods': '#8B5CF6',
  Defence: '#065F46',
  Chemicals: '#14B8A6',
  Textiles: '#EC4899',
  'Media & Entertainment': '#F472B6',
  Telecom: '#6366F1',
  'Cement & Building Materials': '#78716C',
  'Consumer Durables': '#D97706',
  'Power & Utilities': '#DC2626',
  'Shipping & Logistics': '#2563EB',
  'Hotels & Tourism': '#7C3AED',
  Education: '#0891B2',
};

export const graphLodConfig = {
  stockNodeRadiusByCap: {
    large: [6, 10],
    mid: [4, 6],
    small: [2.5, 4],
    micro: [1.5, 2.5],
    sme: [1, 1.5],
  },
  lodDistanceBreakpoints: {
    far: 200,
    mid: 50,
    near: 20,
  },
  initialUniverseLoad: {
    desktopDefault: 500,
    mobileDefault: 200,
  },
  edgeWidthRange: [0.5, 5],
};

export const cameraPresets: CameraPreset[] = [
  { id: 'overview', label: 'Overview', description: 'Entire universe, zoomed out' },
  { id: 'nifty50', label: 'Nifty50 Constellation', description: 'Nifty 50 + strongest links' },
  { id: 'commodity-web', label: 'Commodity Web', description: 'Commodities centered, linked stocks orbiting' },
  { id: 'macro-dashboard', label: 'Macro Dashboard', description: 'Macro nodes centered, sectors radiating out' },
  { id: 'sector-dive', label: 'Sector Deep Dive', description: 'Zoom into selected sector cluster' },
  { id: 'supply-chain', label: 'Supply Chain', description: 'Upstream to downstream flow layout' },
  { id: 'breakout-stars', label: 'Breakout Stars', description: 'Stocks with active breakout flags' },
  { id: 'policy-impact', label: 'Policy Impact', description: 'Policy nodes and affected equities' },
];

export const layoutModes = [
  'force-directed',
  'sector-clusters',
  'supply-chain-flow',
  'circular',
  'hierarchical',
  'geographic',
  'market-cap-tree',
] as const;
