'use client';

import { useState } from 'react';

export default function SearchCommand() {
  const [query, setQuery] = useState('');

  return (
    <div className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
      <label htmlFor="command-search" className="mb-2 block text-sm text-[#8888AA]">
        Command Palette (Cmd+K)
      </label>
      <input
        id="command-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stocks, sectors, commodities, policies..."
        className="w-full rounded-lg border border-[#1E1E2E] bg-[#0A0A0F] px-3 py-2 text-[#E0E0FF] outline-none"
      />
      <p className="mt-2 text-xs text-[#8888AA]">Live search integration to /api/search is scaffolded for wiring.</p>
    </div>
  );
}
