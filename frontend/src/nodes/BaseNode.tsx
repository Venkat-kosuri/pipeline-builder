import React from 'react';
import { Handle, Position } from 'reactflow';

export type HandleDef = { id: string; label?: string } | string;

function normalizeHandles(handles: HandleDef[] | undefined): Array<{ id: string; label?: string }> {
  if (!Array.isArray(handles)) return [];
  return handles.map((h) => (typeof h === 'string' ? { id: h, label: h } : h));
}

function getHandleTop(index: number, total: number) {
  if (total <= 1) return '50%';
  const ratio = (index + 1) / (total + 1);
  return `${Math.round(ratio * 1000) / 10}%`;
}

export type BaseNodeProps = {
  id: string;
  title: React.ReactNode;
  inputs?: HandleDef[];
  outputs?: HandleDef[];
  content: React.ReactNode;
};

export function BaseNode({ id, title, inputs, outputs, content }: BaseNodeProps) {
  const normalizedInputs = normalizeHandles(inputs);
  const normalizedOutputs = normalizeHandles(outputs);

  return (
    <div
      className="w-fit min-w-[200px] rounded-2xl border border-slate-400/35 bg-slate-900/95 p-3 shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:border-indigo-500/55 hover:shadow-xl focus-within:border-indigo-500/80"
    >
      <div className="mb-2 text-[13px] font-bold tracking-wide text-slate-200">{title}</div>

      {normalizedInputs.map((h, i) => (
        <Handle
          key={`in-${h.id}`}
          type="target"
          position={Position.Left}
          id={`${id}:${h.id}`}
          style={{
            top: getHandleTop(i, normalizedInputs.length),
            background: '#60a5fa',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />
      ))}

      {normalizedOutputs.map((h, i) => (
        <Handle
          key={`out-${h.id}`}
          type="source"
          position={Position.Right}
          id={`${id}:${h.id}`}
          style={{
            top: getHandleTop(i, normalizedOutputs.length),
            background: '#34d399',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />
      ))}

      <div className="flex flex-col gap-2">{content}</div>
    </div>
  );
}

