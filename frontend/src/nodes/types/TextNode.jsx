import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { BaseNode } from '../BaseNode';

const Textarea = styled.textarea`
  width: 100%;
  border-radius: 12px;
  padding: 10px 10px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(2, 6, 23, 0.55);
  color: rgba(226, 232, 240, 0.95);
  outline: none;
  resize: none; /* we control sizing programmatically */
  overflow: hidden;

  &:focus {
    border-color: rgba(99, 102, 241, 0.8);
  }
`;

const Hint = styled.div`
  font-size: 12px;
  color: rgba(226, 232, 240, 0.75);
  line-height: 1.35;
`;

function extractVariables(text) {
  // Matches: {{ variableName }} with valid JS identifier characters.
  // - Allows optional whitespace inside braces.
  // - Identifier must start with [A-Za-z_$] and continue with [A-Za-z0-9_$].
  const regex = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
  const found = [];
  const seen = new Set();
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      found.push(name);
    }
  }
  return found;
}

export function TextNode({ id, data }) {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Re-compute handles whenever the text changes.
  const variableNames = useMemo(() => extractVariables(currText), [currText]);
  const inputHandles = useMemo(
    () => variableNames.map((v) => ({ id: v, label: v })),
    [variableNames]
  );

  const outputs = useMemo(() => [{ id: 'output', label: 'Output' }], []);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // Height auto-grow.
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;

    // Width auto-grow (cap to keep nodes usable).
    el.style.width = 'auto';
    const nextWidth = Math.max(180, Math.min(420, el.scrollWidth + 2));
    el.style.width = `${nextWidth}px`;
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={inputHandles}
      outputs={outputs}
      content={
        <>
          <Textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={1}
            aria-label="Text template"
          />
          <Hint>
            Variables: use <span style={{ fontFamily: 'monospace' }}>{'{{variableName}}'}</span>
            {' '}to create dynamic input handles.
          </Hint>
        </>
      }
    />
  );
}

