import React, { useMemo, useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Select, Label } from '../nodeStyles';

export function OutputNode({ id, data }) {
  const initialName = useMemo(
    () => data?.outputName || id.replace('customOutput-', 'output_'),
    [data, id]
  );
  const initialType = useMemo(() => data?.outputType || 'Text', [data]);

  const [currName, setCurrName] = useState(initialName);
  const [outputType, setOutputType] = useState(initialType);

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[]}
      content={
        <>
          <FieldRow>
            <Label>Name</Label>
            <Input value={currName} onChange={(e) => setCurrName(e.target.value)} />
          </FieldRow>
          <FieldRow>
            <Label>Type</Label>
            <Select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
              <option value="Text">Text</option>
              <option value="File">Image</option>
            </Select>
          </FieldRow>
        </>
      }
    />
  );
}

