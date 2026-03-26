'use client';

import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Label } from '../nodeControls';

/**
 * LoggerNode represents a debugging/logging step.
 *
 * Handles:
 * - Inputs: `in`
 * - Outputs: `out`
 *
 * UI field (local state):
 * - `prefix` (log label/prefix)
 */
export function LoggerNode({ id }: { id: string }) {
  const [prefix, setPrefix] = useState('Pipeline Logger');

  return (
    <BaseNode
      id={id}
      title="Logger"
      inputs={[{ id: 'in', label: 'In' }]}
      outputs={[{ id: 'out', label: 'Out' }]}
      content={
        <>
          <FieldRow>
            <Label>Log Prefix</Label>
            <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
          </FieldRow>
        </>
      }
    />
  );
}

