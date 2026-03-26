import React, { useMemo, useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Select, Label } from '../nodeStyles';

export function InputNode({ id, data }) {
  const initialName = useMemo(() => data?.inputName || id.replace('customInput-', 'input_'), [data, id]);
  const initialType = useMemo(() => data?.inputType || 'Text', [data]);

  const [currName, setCurrName] = useState(initialName);
  const [inputType, setInputType] = useState(initialType);

  return (
    <BaseNode
      id={id}
      title="Input"
      inputs={[]}
      outputs={[{ id: 'value', label: 'Value' }]}
      content={
        <>
          <FieldRow>
            <Label>Name</Label>
            <Input value={currName} onChange={(e) => setCurrName(e.target.value)} />
          </FieldRow>
          <FieldRow>
            <Label>Type</Label>
            <Select value={inputType} onChange={(e) => setInputType(e.target.value)}>
              <option value="Text">Text</option>
              <option value="File">File</option>
            </Select>
          </FieldRow>
        </>
      }
    />
  );
}

