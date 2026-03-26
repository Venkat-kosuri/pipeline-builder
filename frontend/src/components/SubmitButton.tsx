'use client';

import React, { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useStore } from '../store';

async function parsePipeline({ nodes, edges }: { nodes: unknown[]; edges: unknown[] }) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  const res = await fetch(`${API_BASE_URL}/pipelines/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });

  const contentType = res.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = typeof body === 'string' ? body : JSON.stringify(body);
    throw new Error(`Backend error (${res.status}): ${msg}`);
  }
  return body;
}

export function SubmitButton() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const payload = useMemo(() => ({ nodes, edges }), [nodes, edges]);

  const mutation = useMutation({
    mutationFn: () => parsePipeline(payload),
    onSuccess: (data: any) => {
      setModalTitle('Pipeline Parse Result');
      const maybeNumNodes = data?.num_nodes;
      const maybeNumEdges = data?.num_edges;
      const maybeIsDag = data?.is_dag;
      if (
        typeof maybeNumNodes === 'number' &&
        typeof maybeNumEdges === 'number' &&
        typeof maybeIsDag === 'boolean'
      ) {
        setModalBody(
          `Number of nodes: ${maybeNumNodes}\nNumber of edges: ${maybeNumEdges}\nIs DAG: ${maybeIsDag ? 'Yes' : 'No'}`
        );
      } else {
        setModalBody(JSON.stringify(data, null, 2));
      }
      setModalOpen(true);
    },
    onError: (err: any) => {
      setModalTitle('Pipeline Parse Failed');
      setModalBody(err?.message ? String(err.message) : 'Unknown error');
      setModalOpen(true);
    },
  });

  const isLoading = (mutation as any).isPending ?? (mutation as any).isLoading;

  return (
    <>
      <div className="flex items-center justify-center p-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            mutation.mutate();
          }}
          className="rounded-xl border border-slate-400/35 bg-indigo-500/15 px-4 py-2 font-bold text-slate-100 transition hover:-translate-y-0.5 hover:border-indigo-500/70 hover:bg-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-slate-950/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-[520px] rounded-2xl border border-slate-400/35 bg-slate-950 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 text-sm font-extrabold text-slate-100">{modalTitle}</div>
            <pre className="m-0 break-words whitespace-pre-wrap text-[13px] leading-relaxed text-slate-100/90">
              {modalBody}
            </pre>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-slate-400/35 bg-slate-900/60 px-3 py-2 font-bold text-slate-100 hover:border-indigo-500/70"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

