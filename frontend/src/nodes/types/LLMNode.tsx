'use client';

import React from 'react';
import { BaseNode } from '../BaseNode';

/**
 * LLMNode represents an LLM call node.
 *
 * Handles:
 * - Inputs: `system` and `prompt`
 * - Output: `response`
 */
export function LLMNode({ id }: { id: string; data?: any }) {
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
          <div className="text-[12px] leading-relaxed text-slate-200/85">This node represents an LLM call.</div>
          <div className="rounded-2xl border border-slate-400/20 bg-slate-900/50 p-2 text-[12px] font-medium text-slate-100/90">
            Use edges to wire system + prompt into a response output.
          </div>
        </>
      }
    />
  );
}

