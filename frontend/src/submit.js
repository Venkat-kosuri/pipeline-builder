// submit.js

import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const Button = styled.button`
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(99, 102, 241, 0.16);
  color: rgba(226, 232, 240, 0.95);
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(99, 102, 241, 0.75);
    background: rgba(99, 102, 241, 0.24);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModalCard = styled.div`
  width: min(520px, 100%);
  background: #0b1220;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 16px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
  padding: 16px;
`;

const ModalTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 8px;
  color: rgba(226, 232, 240, 0.95);
`;

const ModalBody = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  color: rgba(226, 232, 240, 0.9);
  font-size: 13px;
  line-height: 1.4;
`;

const CloseRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

const CloseButton = styled.button`
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(2, 6, 23, 0.55);
  color: rgba(226, 232, 240, 0.95);
  padding: 8px 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: rgba(99, 102, 241, 0.75);
  }
`;

async function parsePipeline({ nodes, edges }) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
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

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const payload = useMemo(() => ({ nodes, edges }), [nodes, edges]);

  const mutation = useMutation({
    mutationFn: () => parsePipeline(payload),
    onSuccess: (data) => {
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
    onError: (err) => {
      setModalTitle('Pipeline Parse Failed');
      setModalBody(err?.message ? String(err.message) : 'Unknown error');
      setModalOpen(true);
    },
  });

  const isLoading = mutation.isPending ?? mutation.isLoading;

  return (
    <>
      <Wrapper>
        <Button
          type="button"
          disabled={isLoading}
          onClick={() => {
            mutation.mutate();
          }}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Wrapper>

      {modalOpen && (
        <ModalOverlay
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
        >
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{modalTitle}</ModalTitle>
            <ModalBody>{modalBody}</ModalBody>
            <CloseRow>
              <CloseButton type="button" onClick={() => setModalOpen(false)}>
                Close
              </CloseButton>
            </CloseRow>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
};
