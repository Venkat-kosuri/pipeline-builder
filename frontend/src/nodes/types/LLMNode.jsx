import React from 'react';
import styled from 'styled-components';
import { BaseNode } from '../BaseNode';

const Text = styled.div`
  font-size: 12px;
  color: rgba(226, 232, 240, 0.85);
  line-height: 1.35;
`;

const CodeLike = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 12px;
  color: rgba(226, 232, 240, 0.9);
  background: rgba(2, 6, 23, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 12px;
  padding: 10px;
`;

export function LLMNode({ id }) {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
      content={
        <>
          <Text>This node represents an LLM call.</Text>
          <CodeLike>Use edges to wire system + prompt into a response output.</CodeLike>
        </>
      }
    />
  );
}

