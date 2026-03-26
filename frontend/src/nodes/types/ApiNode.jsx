import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { FieldRow, Input, Select, Label } from '../nodeStyles';

export function ApiNode({ id }) {
  const [url, setUrl] = useState('https://api.example.com/data');
  const [method, setMethod] = useState('POST');

  return (
    <BaseNode
      id={id}
      title="API"
      inputs={[]}
      outputs={[{ id: 'out', label: 'Response' }]}
      content={
        <>
          <FieldRow>
            <Label>URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          </FieldRow>
          <FieldRow>
            <Label>Method</Label>
            <Select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </Select>
          </FieldRow>
        </>
      }
    />
  );
}

