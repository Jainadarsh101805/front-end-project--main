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
            "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 62, color: "#ff003c" }}>Akarsh Aura Flow </h1>
        <h2 style={{ fontSize: 62,  color: "green" }}>Visual Decision Flow Builder</h2>
        <p style={{ fontSize: 28, opacity: 0.9, color: "black"}}>

            Workflow Builder is a visual tool that allows users to design and manage decision-based workflows with ease. Using a node-based interface, users can create action steps, define conditional branches, and control the flow from start to completion. This dashboard focuses on clarity, flexibility, and structured logic, enabling seamless workflow creation without relying on external UI or diagram libraries.
        </p>

        <button
          onClick={() => setPage("designer")}
          style={{
            marginTop: 30,
            padding: "14px 28px",
            fontSize: 16,
            background: "black",
            color: "Red",
            border: "none",
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
