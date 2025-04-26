export default function Section({ title, children }) {
    return (
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        marginBottom: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{
          borderBottom: "2px solid #eee",
          paddingBottom: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "1.5rem"
        }}>{title}</h2>
        {children}
      </div>
    );
  }
  