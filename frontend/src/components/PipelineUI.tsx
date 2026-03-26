'use client';

/**
 * PipelineUI is the main React Flow canvas.
 *
 * It wires up:
 * - Zustand state for `nodes` and `edges`
 * - drag/drop handling (create nodes from the palette)
 * - `nodeTypes` mapping (string type -> React component)
 */
import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap, type ReactFlowInstance, type NodeTypes } from 'reactflow';
import { useStore } from '../store';

import { InputNode } from '../nodes/types/InputNode';
import { LLMNode } from '../nodes/types/LLMNode';
import { OutputNode } from '../nodes/types/OutputNode';
import { TextNode } from '../nodes/types/TextNode';
import { ApiNode } from '../nodes/types/ApiNode';
import { FilterNode } from '../nodes/types/FilterNode';
import { TransformNode } from '../nodes/types/TransformNode';
import { DelayNode } from '../nodes/types/DelayNode';
import { LoggerNode } from '../nodes/types/LoggerNode';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// React Flow uses this map to render each node type by `node.type`.
const nodeTypes: NodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: ApiNode,
  filter: FilterNode,
  transform: TransformNode,
  delay: DelayNode,
  logger: LoggerNode,
};

export function PipelineUI() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const reactFlowInstanceRef = useRef<ReactFlowInstance | null>(null);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const getInitNodeData = useCallback((nodeID: string) => {
    return { id: nodeID };
  }, []);

  /**
   * Called when the user drops a node from the toolbar onto the canvas.
   * `event.dataTransfer` contains JSON like: { nodeType: "llm" }
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowInstance = reactFlowInstanceRef.current;
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw) return;

      const appData = JSON.parse(raw) as { nodeType?: string };
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID),
      } as any;

      addNode(newNode);
    },
    [getNodeID, addNode, getInitNodeData]
  );

  // Allow dropping by preventing the default browser handling.
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full" style={{ height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={(instance) => {
          reactFlowInstanceRef.current = instance;
        }}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={'smoothstep' as any}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

