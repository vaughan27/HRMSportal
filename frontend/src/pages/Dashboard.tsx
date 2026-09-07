import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "64px 32px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "2rem", margin: "0 0 12px" }}>
        
      </h1>
      <p style={{ color: "var(--color-ink-muted)", marginBottom: 24 }}>
        More pages coming soon...
      </p>
      <Link
        to="/lead-enquiries"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "var(--color-accent)",
          color: "#fff",
          borderRadius: "var(--radius-sm)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        Customer Wishlist
      </Link>
    </div>
  );
}
