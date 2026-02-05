import { useState } from "react";
import NodeCard from "./NodeCard";

type NodeType = "start" | "action" | "branch";

type Node = {
  id: string;
  type: NodeType;
  label: string;
};

export default function WorkflowCanvas() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "start-1", type: "start", label: "Start" },
  ]);

  const [botMessage, setBotMessage] = useState(
    "Click +Action or +Branch to begin"
  );

  // ADD NODE
  const addNode = (type: NodeType) => {
    setNodes((prev) => [
      ...prev,
      {
        id: `${type}-${Date.now()}`,
        type,
        label:
          type === "action"
            ? "Action Step"
            : type === "branch"
            ? "Decision"
            : "Start",
      },
    ]);

    setBotMessage(
      type === "action"
        ? "Action added. Continue building."
        : "Decision added. Choose Yes or No."
    );
  };

  // DELETE NODE
  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setBotMessage("Node removed.");
  };

  // YES → add next action
  const handleYes = () => {
    addNode("action");
  };

  // NO → close branch
  const handleNo = (branchId: string) => {
    deleteNode(branchId);
    setBotMessage("No path selected. Branch closed.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        display: "flex",
        gap: 30,
        color: "white",
        background: `
          linear-gradient(135deg, rgba(0,0,0,0.92), rgba(20,0,0,0.95)),
          url("https://images.unsplash.com/photo-1557683316-973673baf926")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT ASSISTANT PANEL */}
      <div
        style={{
          width: 280,
          background: "rgba(0,0,0,0.85)",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 0 30px rgba(239,68,68,0.35)",
          height: "fit-content",
          border: "1px solid rgba(239,68,68,0.35)",
        }}
      >
        <h3 style={{ color: "#ef4444" }}>🤖 Flow Assistant</h3>

        <p style={{ fontSize: 13, opacity: 0.85 }}>
          Design decision workflows visually.
        </p>

        <ul style={{ fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>
          <li>➕ Add actions</li>
          <li>🔀 Create decisions</li>
          <li>🧠 Model logic clearly</li>
          <li>💾 Export workflow JSON</li>
        </ul>

        <div
          style={{
            marginTop: 14,
            padding: 10,
            background: "rgba(239,68,68,0.15)",
            borderRadius: 8,
            fontSize: 12,
            border: "1px solid rgba(239,68,68,0.35)",
          }}
        >
          Tip: Start → Action → Decision → Action
        </div>
      </div>

      {/* WORKFLOW CANVAS */}
      <div
        style={{
          flex: 1,
          background: "rgba(0,0,0,0.55)",
          border: "1px dashed rgba(239,68,68,0.45)",
          borderRadius: 16,
          padding: 30,
          backdropFilter: "blur(6px)",
        }}
      >
        <h2 style={{ color: "#f87171" }}>🧩 Workflow Designer</h2>

        <p style={{ opacity: 0.75, marginBottom: 20 }}>
          Build and visualize decision flows without code.
        </p>

        {/* NODE LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              label={node.label}
              type={node.type}
              onAddAction={() => addNode("action")}
              onAddBranch={() => addNode("branch")}
              onDelete={() => deleteNode(node.id)}
              onYes={handleYes}
              onNo={() => handleNo(node.id)}
            />
          ))}
        </div>

        {/* SAVE */}
        <button
          onClick={() => {
            console.log("Workflow JSON:", nodes);
            alert("Workflow saved to console");
            setBotMessage("Workflow saved successfully.");
          }}
          style={{
            marginTop: 26,
            padding: "12px 18px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          💾 Save Workflow
        </button>
      </div>

      {/* BOT BADGE */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "rgba(0,0,0,0.9)",
          padding: "10px 14px",
          borderRadius: 999,
          fontSize: 12,
          border: "1px solid rgba(239,68,68,0.45)",
          boxShadow: "0 0 20px rgba(239,68,68,0.45)",
        }}
      >
        🤖 <span style={{ opacity: 0.9 }}>{botMessage}</span>
      </div>
    </div>
  );
}
