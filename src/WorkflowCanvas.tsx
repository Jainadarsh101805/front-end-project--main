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
  };

  // DELETE NODE
  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
  };

  // YES → add next action
  const handleYes = () => {
    addNode("action");
  };

  // NO → close branch
  const handleNo = (branchId: string) => {
    deleteNode(branchId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        display: "flex",
        color: "white",
        background: `
          linear-gradient(135deg, rgba(0,0,0,0.92), rgba(20,0,0,0.95)),
          url("https://images.unsplash.com/photo-1557683316-973673baf926")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
    </div>
  );
}
