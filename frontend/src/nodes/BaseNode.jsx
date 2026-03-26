import React from 'react';
import styled from 'styled-components';
import { Handle, Position } from 'reactflow';

const Card = styled.div`
  background: #0f172a; /* slate-900 */
  border: 1px solid rgba(148, 163, 184, 0.35); /* slate-400-ish */
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  padding: 12px 12px 10px;
  min-width: 200px;
  width: fit-content;
  transition: box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(99, 102, 241, 0.55); /* indigo-ish */
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
  }

  &:focus-within {
    border-color: rgba(99, 102, 241, 0.8);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
  }
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: rgba(226, 232, 240, 0.95); /* slate-200-ish */
  letter-spacing: 0.2px;
  margin-bottom: 8px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function normalizeHandles(handles) {
  if (!Array.isArray(handles)) return [];
  return handles.map((h) => (typeof h === 'string' ? { id: h, label: h } : h));
}

function getHandleTop(index, total) {
  if (total <= 1) return '50%';
  // Evenly space handles vertically.
  const ratio = (index + 1) / (total + 1);
  return `${Math.round(ratio * 1000) / 10}%`;
}

export function BaseNode({ id, title, inputs, outputs, content }) {
  const normalizedInputs = normalizeHandles(inputs);
  const normalizedOutputs = normalizeHandles(outputs);

  return (
    <Card>
      <Title>{title}</Title>

      {/* Handles are rendered as children so React Flow can wire connections. */}
      {normalizedInputs.map((h, i) => (
        <Handle
          key={`in-${h.id}`}
          type="target"
          position={Position.Left}
          id={`${id}:${h.id}`}
          style={{
            top: getHandleTop(i, normalizedInputs.length),
            background: '#60a5fa', // blue-400
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
            background: '#34d399', // emerald-400
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />
      ))}

      <Body>{content}</Body>
    </Card>
  );
}

