import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Label } from '../nodeStyles';

export function DelayNode({ id }) {
  const [delayMs, setDelayMs] = useState(500);

  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[{ id: 'in', label: 'In' }]}
      outputs={[{ id: 'out', label: 'Out' }]}
      content={
        <>
          <FieldRow>
            <Label>Delay (ms)</Label>
            <Input
              type="number"
              value={delayMs}
              min={0}
              onChange={(e) => setDelayMs(Number(e.target.value))}
            />
          </FieldRow>
        </>
      }
    />
  );
}

