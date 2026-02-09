import { useState } from "react";
import WorkflowCanvas from "./WorkflowCanvas";

export default function App() {
  const [page, setPage] = useState<"home" | "designer">("home");

  if (page === "home") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #111111, #1f2937, #000000)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: 40,
        }}
      >
        <h1
          style={{
            fontSize: 62,
            color: "red",
            background: "black",
            padding: "16px 28px",
            borderRadius: 12,
          }}
        >
          Adarsh Jain Frontend Aura Flow Project 
        </h1>

        <h2 style={{ fontSize: 52, color: "#38bdf8" }}>
          Visual Decision Flow Builder
        </h2>

        <p style={{ fontSize: 22, opacity: 0.9, color: "#e5e7eb", maxWidth: 1100 }}>
         This project allows you to visually design workflows using
          actions and decision branches. It is built to be simple,
          user-friendly, and practical for real-world logic building.
        </p>

        <button
          onClick={() => setPage("designer")}
          style={{
            marginTop: 30,
            padding: "14px 28px",
            fontSize: 16,
            background: "black",
            color: "red",
            border: "1px solid red",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Start Designing →
        </button>
      </div>
    );
  }

  return <WorkflowCanvas onBack={() => setPage("home")} />;
}
