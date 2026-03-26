import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Label } from '../nodeStyles';

export function LoggerNode({ id }) {
  const [label, setLabel] = useState('Pipeline Logger');

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
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </FieldRow>
        </>
      }
    />
  );
}

