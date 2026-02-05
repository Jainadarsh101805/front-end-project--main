type Props = {
  label: string;
  type: "start" | "action" | "branch";
  onAddAction?: () => void;
  onAddBranch?: () => void;
  onDelete?: () => void;
  onYes?: () => void;
  onNo?: () => void;
};

export default function NodeCard({
  label,
  type,
  onAddAction,
  onAddBranch,
  onDelete,
  onYes,
  onNo,
}: Props) {
  const borderColor =
    type === "start"
      ? "#22c55e"
      : type === "action"
      ? "#3b82f6"
      : "#f59e0b";

  return (
    <div
      style={{
        background: "#0b0b0b",
        borderLeft: `6px solid ${borderColor}`,
        padding: 16,
        borderRadius: 10,
      }}
    >
      <strong>{label}</strong>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {onAddAction && <button onClick={onAddAction}>+ Action</button>}
        {onAddBranch && <button onClick={onAddBranch}>+ Branch</button>}
        {type !== "start" && onDelete && (
          <button style={{ color: "red" }} onClick={onDelete}>
            Delete
          </button>
        )}
      </div>

      {/* ONLY show Yes / No for branch */}
      {type === "branch" && (
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button
            onClick={onYes}
            style={{ background: "#22c55e", color: "black" }}
          >
            Yes
          </button>
          <button
            onClick={onNo}
            style={{ background: "#ef4444", color: "white" }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
