import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Label } from '../nodeStyles';

export function FilterNode({ id }) {
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

