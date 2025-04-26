export default function MultiCheckboxGroup({ label, options, selected, onChange }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
        {label}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {options.map((opt) => (
          <label key={opt.value} style={{ fontWeight: "normal" }}>
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => onChange(opt.value)}
            />
            {" "}
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
