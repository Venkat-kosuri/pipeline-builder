import styled from 'styled-components';

export const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.span`
  color: rgba(226, 232, 240, 0.9);
  font-size: 12px;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(2, 6, 23, 0.55);
  color: rgba(226, 232, 240, 0.95);
  outline: none;

  &:focus {
    border-color: rgba(99, 102, 241, 0.8);
  }
`;

export const Select = styled.select`
  width: 100%;
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(2, 6, 23, 0.55);
  color: rgba(226, 232, 240, 0.95);
  outline: none;

  &:focus {
    border-color: rgba(99, 102, 241, 0.8);
  }
`;

