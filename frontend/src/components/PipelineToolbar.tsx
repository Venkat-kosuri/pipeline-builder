'use client';

/**
 * PipelineToolbar renders the palette of draggable node types.
 *
 * React Flow drag/drop expects we store a payload on `dataTransfer` with the key
 * `application/reactflow` and include a `nodeType` string. The canvas reads that
 * value in `PipelineUI` to instantiate the correct node component.
 */
import { DraggableNode } from './draggableNode';

export function PipelineToolbar() {
  return (
    <div className="p-2">
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="logger" label="Logger" />
      </div>
    </div>
  );
}

