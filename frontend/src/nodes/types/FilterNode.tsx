'use client';

import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Label } from '../nodeControls';

/**
 * FilterNode filters a stream of items using a JS expression.
 *
 * Handles:
 * - Inputs: `in`
 * - Outputs: `out`
 *
 * UI field (local state):
 * - `condition` (a string like `item.enabled === true`)
 */
export function FilterNode({ id }: { id: string }) {
  const [condition, setCondition] = useState('item.enabled === true');

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{ id: 'in', label: 'In' }]}
      outputs={[{ id: 'out', label: 'Out' }]}
      content={
        <>
          <FieldRow>
            <Label>Condition (JS expression)</Label>
            <Input value={condition} onChange={(e) => setCondition(e.target.value)} />
          </FieldRow>
        </>
      }
    />
  );
}

