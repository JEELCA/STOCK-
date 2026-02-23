const demoConnections = [
  { entity: 'Brent Crude', type: 'Commodity', relation: 'USES_RAW_MATERIAL', strength: 0.81, direction: 'NEGATIVE', impact: 'Headwind if Brent > $90' },
  { entity: 'USD/INR', type: 'Currency', relation: 'REVENUE_EXPOSED_TO', strength: 0.67, direction: 'POSITIVE', impact: 'Weak INR supports exports' },
  { entity: 'PLI Electronics', type: 'Policy', relation: 'BENEFITS_FROM', strength: 0.74, direction: 'POSITIVE', impact: 'Order visibility up' },
];

export default function ConnectionPanel() {
  return (
    <section className="rounded-xl border border-[#1E1E2E] bg-[#12121A] p-4">
      <h3 className="mb-3 text-lg font-semibold text-[#E0E0FF]">Connection Table</h3>
      <table className="w-full text-left text-sm text-[#E0E0FF]">
        <thead className="text-[#8888AA]">
          <tr><th>Entity</th><th>Type</th><th>Relationship</th><th>Strength</th><th>Direction</th><th>Impact</th></tr>
        </thead>
        <tbody>
          {demoConnections.map((row) => (
            <tr key={row.entity} className="border-t border-[#1E1E2E]">
              <td>{row.entity}</td><td>{row.type}</td><td>{row.relation}</td><td>{row.strength.toFixed(2)}</td><td>{row.direction}</td><td>{row.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
