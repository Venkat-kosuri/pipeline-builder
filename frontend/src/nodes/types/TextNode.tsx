'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from '../BaseNode';

/**
 * Extracts unique variable names from a text template.
 *
 * Template syntax: `{{variableName}}`
 * - Whitespace inside braces is allowed.
 * - `variableName` must match a JS identifier-like pattern.
 */
function extractVariables(text: string) {
  // Matches: {{ variableName }} with valid JS identifier characters.
  // - Allows optional whitespace inside braces.
  // - Identifier must start with [A-Za-z_$] and continue with [A-Za-z0-9_$].
  const regex = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
  const found: string[] = [];
  const seen = new Set<string>();

  let match: RegExpExecArray | null = null;
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

/**
 * TextNode provides an editable text template and generates input handles
 * for each `{{variableName}}` it detects.
 *
 * Handles:
 * - Inputs: one per detected variable name
 * - Outputs: `output`
 */
export function TextNode({ id, data }: { id: string; data: any }) {
  const [currText, setCurrText] = useState<string>(data?.text || '{{input}}');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const variableNames = useMemo(() => extractVariables(currText), [currText]);
  const inputHandles = useMemo(() => variableNames.map((v) => ({ id: v, label: v })), [variableNames]);
  const outputs = useMemo(() => [{ id: 'output', label: 'Output' }], []);

  // useEffect(() => {
  //   const el = textareaRef.current;
  //   if (!el) return;

  //   // Height auto-grow.
  //   el.style.height = 'auto';
  //   el.style.height = `${el.scrollHeight}px`;

  //   // Width auto-grow (cap to keep nodes usable).
  //   el.style.width = 'auto';
  //   const nextWidth = Math.max(180, Math.min(420, el.scrollWidth + 2));
  //   el.style.width = `${nextWidth}px`;
  // }, [currText, variableNames.length]);
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
  
    const MAX_HEIGHT = 200;
  
    // Reset height to calculate correctly
    el.style.height = 'auto';
  
    // Set height with cap
    const newHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
  
    // Enable scroll only when needed
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  
    // Width auto-grow (keep yours)
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
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={1}
           className="w-[280px] resize-none overflow-y-auto rounded-2xl border border-slate-400/35 bg-slate-900/55 px-3 py-2 text-slate-100 outline-none focus:border-indigo-500/80 pr-2"
            aria-label="Text template"
          />
          <div className="text-[12px] leading-relaxed text-slate-200/75">
            Variables: use <span className="font-mono">{'{{variableName}}'}</span> to create dynamic input
            handles.
          </div>
        </>
      }
    />
  );
}

