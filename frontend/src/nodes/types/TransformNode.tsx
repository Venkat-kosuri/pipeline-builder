'use client';

import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Label } from '../nodeControls';

export function TransformNode({ id }: { id: string }) {
  const [transform, setTransform] = useState('({ ...item, name: item.name.toUpperCase() })');

  return (
    <BaseNode
      id={id}
      title="Transform"
      inputs={[{ id: 'in', label: 'In' }]}
      outputs={[{ id: 'out', label: 'Out' }]}
      content={
        <>
          <FieldRow>
            <Label>Transform (JS expression)</Label>
            <Input value={transform} onChange={(e) => setTransform(e.target.value)} />
          </FieldRow>
        </>
      }
    />
  );
}

