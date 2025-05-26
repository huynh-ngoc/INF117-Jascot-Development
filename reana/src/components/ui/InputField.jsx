export default function InputField({ name, placeholder, value, onChange, required }) {
    return (
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
        />
      </div>
    );
  }
  