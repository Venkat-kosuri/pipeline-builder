'use client';

/**
 * Zustand store backing the pipeline canvas.
 *
 * Notes:
 * - `nodeIDs` generates unique node ids per node type (e.g. `llm-1`, `llm-2`).
 * - `updateNodeField` updates `node.data[fieldName]` for a specific node.
 */
import { create } from 'zustand';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type EdgeChange,
  type NodeChange,
} from 'reactflow';

type NodeIDs = Record<string, number>;

type PipelineState = {
  nodes: Node[];
  edges: Edge[];
  nodeIDs: NodeIDs;

  getNodeID: (type: string) => string;
  addNode: (node: Node) => void;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  updateNodeField: (nodeId: string, fieldName: string, fieldValue: unknown) => void;
};

export const useStore = create<PipelineState>((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const current = get().nodeIDs[type] ?? 0;
    const next = current + 1;
    set({ nodeIDs: { ...get().nodeIDs, [type]: next } });
    return `${type}-${next}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: 20,
            width: 20,
          },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id !== nodeId) return node;
        return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
      }),
    });
  },
}));

