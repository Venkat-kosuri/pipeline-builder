'use client';

/**
 * DraggableNode is a palette item used by `PipelineToolbar`.
 *
 * On drag start it stores a JSON payload in the drag event so the canvas can
 * instantiate the matching node type.
 */
export function DraggableNode({ type, label }: { type: string; label: string }) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.cursor = 'grabbing';
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.cursor = 'grab';
  };

  return (
    <div
      className="cursor-grab select-none rounded-lg bg-slate-800 px-4 py-3 text-center text-sm font-semibold text-slate-100 shadow-sm hover:bg-slate-700"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {label}
    </div>
  );
}

