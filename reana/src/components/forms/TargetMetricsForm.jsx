import Section from "@/components/ui/Section";

export default function TargetMetricsForm({ metrics, onMetricChange }) {
  return (
    <Section title="Target Metrics">
      {/* --- Cap Rate --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Cap Rate (%)</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            name="capRate"
            min="0"
            max="20"
            step="0.1"
            value={metrics.capRate}
            onChange={onMetricChange}
            className="w-full"
          />
          <span className="min-w-[40px] text-sm">{metrics.capRate}%</span>
        </div>
      </div>

      {/* --- Cash on Cash --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Cash on Cash (CoC) Return at 12 Months (%)</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            name="cashOnCash"
            min="0"
            max="20"
            step="0.1"
            value={metrics.cashOnCash}
            onChange={onMetricChange}
            className="w-full"
          />
          <span className="min-w-[40px] text-sm">{metrics.cashOnCash}%</span>
        </div>
      </div>

      {/* --- DSCR --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Debt Service Coverage Ratio (DSCR)</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            name="dscr"
            min="0.5"
            max="2.5"
            step="0.1"
            value={metrics.dscr}
            onChange={onMetricChange}
            className="w-full"
          />
          <span className="min-w-[40px] text-sm">{metrics.dscr}</span>
        </div>
      </div>

      {/* --- GRM --- */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Gross Rent Multiplier (GRM)</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            name="grm"
            min="5"
            max="30"
            step="1"
            value={metrics.grm}
            onChange={onMetricChange}
            className="w-full"
          />
          <span className="min-w-[40px] text-sm">{metrics.grm}</span>
        </div>
      </div>

      {/* --- Reference Table --- */}
      <div className="mt-6 border rounded shadow-sm overflow-x-auto">
        <h4 className="text-md font-semibold px-4 pt-4">Area Rule of Thumb (Suggested)</h4>
        <table className="w-full text-sm mt-2 mb-4 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Metric</th>
              <th className="p-2 border">MSA</th>
              <th className="p-2 border">Micro</th>
              <th className="p-2 border">Rural</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Cap Rate</td>
              <td className="p-2 border">4 – 7%</td>
              <td className="p-2 border">6 – 8%</td>
              <td className="p-2 border">8 – 12%</td>
            </tr>
            <tr>
              <td className="p-2 border">Cash on Cash</td>
              <td className="p-2 border">6 – 10%</td>
              <td className="p-2 border">8 – 12%</td>
              <td className="p-2 border">{">10%"}</td>
            </tr>
            <tr>
              <td className="p-2 border">DSCR</td>
              <td className="p-2 border">1.2 – 1.5</td>
              <td className="p-2 border">1.3 – 1.6</td>
              <td className="p-2 border">1.5 – 2.0</td>
            </tr>
            <tr>
              <td className="p-2 border">GRM</td>
              <td className="p-2 border">15 – 20</td>
              <td className="p-2 border">10 – 15</td>
              <td className="p-2 border">6 – 10</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Info Note --- */}
      <p className="text-sm mt-4 text-gray-700">
        <strong>Note:</strong> MSA = Metro area (≥50k population), Micro = 10k–49,999, Rural = under
        10k. Consult local agents/lenders for accurate targets.
      </p>
    </Section>
  );
}
