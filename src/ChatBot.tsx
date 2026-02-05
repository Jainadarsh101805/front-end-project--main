import { useState } from "react";

type Props = {
  onAddAction: () => void;
  onAddBranch: () => void;
  onReset: () => void;
};

export default function ChatBot({
  onAddAction,
  onAddBranch,
  onReset,
}: Props) {
  const [messages, setMessages] = useState<string[]>([
    "Hi 👋 I’m FlowBot. Type: add action / add branch / reset",
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    const newMessages = [...messages, `You: ${input}`];

    if (userMsg.includes("add action")) {
      onAddAction();
      newMessages.push("Bot: ✅ Action added.");
    } else if (userMsg.includes("add branch")) {
      onAddBranch();
      newMessages.push("Bot: 🔀 Branch added.");
    } else if (userMsg.includes("reset")) {
      onReset();
      newMessages.push("Bot: ♻ Workflow reset.");
    } else {
      newMessages.push("Bot: ❓ I didn’t understand.");
    }

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 300,
        background: "#020617",
        borderRadius: 12,
        padding: 12,
        color: "white",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
      }}
    >
      <strong>🤖 FlowBot</strong>

      <div
        style={{
          maxHeight: 180,
          overflowY: "auto",
          marginTop: 8,
          fontSize: 13,
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            {m}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command..."
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
