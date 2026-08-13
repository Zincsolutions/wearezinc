import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
        background: "#fff",
        color: "#0c2954",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p style={{ fontSize: "5rem", fontWeight: 700, margin: 0, lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>Page not found</h1>
      <p style={{ maxWidth: "28rem", margin: 0, color: "#4c5a6b" }}>
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        style={{
          background: "#ff5b19",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "999px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Back to home &gt;
      </Link>
    </main>
  );
}
