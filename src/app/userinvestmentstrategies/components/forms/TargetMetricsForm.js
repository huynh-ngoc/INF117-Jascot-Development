import Section from "@/app/userinvestmentstrategies/components/ui/Section";
import styles from "@/app/userinvestmentstrategies/page.module.css";
import styles from "@/app/userinvestmentstrategies/styles/TargetMetricsForm.module.css";



export default function TargetMetricsForm({ metrics, onMetricChange }) {
  return (
    <Section title="Target Metrics">
      <div className={styles.metricRow}>
        <label>Cap Rate (%)</label>
        <input
          type="range"
          name="capRate"
          min="0"
          max="20"
          step="0.1"
          value={metrics.capRate}
          onChange={onMetricChange}
        />
        <span>{metrics.capRate}%</span>
      </div>

      <div className={styles.metricRow}>
        <label>Cash on Cash (CoC) Return at 12 Months (%)</label>
        <input
          type="range"
          name="cashOnCash"
          min="0"
          max="20"
          step="0.1"
          value={metrics.cashOnCash}
          onChange={onMetricChange}
        />
        <span>{metrics.cashOnCash}%</span>
      </div>

      <div className={styles.metricRow}>
        <label>Debt Service Coverage Ratio (DSCR)</label>
        <input
          type="range"
          name="dscr"
          min="0.5"
          max="2.5"
          step="0.1"
          value={metrics.dscr}
          onChange={onMetricChange}
        />
        <span>{metrics.dscr}</span>
      </div>

      <div className={styles.metricRow}>
        <label>Gross Rent Multiplier (GRM)</label>
        <input
          type="range"
          name="grm"
          min="5"
          max="30"
          step="1"
          value={metrics.grm}
          onChange={onMetricChange}
        />
        <span>{metrics.grm}</span>
      </div>

      <div className={styles.referenceTable}>
        <h4>Area Rule of Thumb (Suggested)</h4>
        <table>
            <thead>
            <tr>
                <th>Metric</th>
                <th>MSA</th>
                <th>Micro</th>
                <th>Rural</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Cap Rate</td>
                <td>4 – 7%</td>
                <td>6 – 8%</td>
                <td>8 – 12%</td>
            </tr>
            <tr>
                <td>Cash on Cash</td>
                <td>6 – 10%</td>
                <td>8 – 12%</td>
                <td>{">10%"}</td> {/* ✅ JSX-safe */}
            </tr>
            <tr>
                <td>DSCR</td>
                <td>1.2 – 1.5</td>
                <td>1.3 – 1.6</td>
                <td>1.5 – 2.0</td>
            </tr>
            <tr>
                <td>GRM</td>
                <td>15 – 20</td>
                <td>10 – 15</td>
                <td>6 – 10</td>
            </tr>
            </tbody>
        </table>
        </div>


      <p className={styles.infoNote}>
        <strong>Note:</strong> MSA = Metro area with ≥50k population. Micro = 10k–49,999. Rural = under 10k. Check with local agents/lenders for accurate targets.
      </p>
    </Section>
  );
}
