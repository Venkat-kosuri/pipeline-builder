'use client';

import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Label } from '../nodeControls';

export function DelayNode({ id }: { id: string }) {
  const [delayMs, setDelayMs] = useState<number>(500);

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
            <Input type="number" min={0} value={delayMs} onChange={(e) => setDelayMs(Number(e.target.value))} />
          </FieldRow>
        </>
      }
    />
  );
}

