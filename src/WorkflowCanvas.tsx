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

  // NO → close branch (do nothing else)
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
          linear-gradient(135deg, rgba(2,6,23,0.92), rgba(15,23,42,0.95)),
          url("https://images.unsplash.com/photo-1535378620166-273708d44e4c")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT ASSISTANT PANEL */}
      <div
        style={{
          width: 280,
          background: "rgba(2,6,23,0.9)",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 0 30px rgba(34,197,94,0.25)",
          height: "fit-content",
        }}
      >
        <h3>🤖 Flow Assistant</h3>
        <p style={{ fontSize: 13, opacity: 0.8 }}>
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
            background: "rgba(34,197,94,0.15)",
            borderRadius: 8,
            fontSize: 12,
          }}
        >
          Tip: Start → Action → Decision → Action
        </div>
      </div>

      {/* WORKFLOW CANVAS */}
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.04)",
          border: "1px dashed rgba(255,255,255,0.25)",
          borderRadius: 16,
          padding: 30,
        }}
      >
        <h2>🧩 Workflow Designer</h2>
        <p style={{ opacity: 0.7, marginBottom: 20 }}>
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
            background: "#22c55e",
            color: "black",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          💾 Save Workflow
        </button>
      </div>

      {/* SUBTLE BOT BADGE */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "rgba(2,6,23,0.9)",
          padding: "10px 14px",
          borderRadius: 999,
          fontSize: 12,
          boxShadow: "0 0 20px rgba(34,197,94,0.35)",
        }}
      >
        🤖 <span style={{ opacity: 0.85 }}>{botMessage}</span>
      </div>
    </div>
  );
}
