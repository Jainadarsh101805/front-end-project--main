export type NodeType = "start" | "action" | "branch" | "end";

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  children: string[];
}

export interface WorkflowState {
  nodes: Record<string, WorkflowNode>;
  rootId: string | null;
}
