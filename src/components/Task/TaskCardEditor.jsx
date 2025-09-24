import React from 'react';
import Button from '../Button';
import styled from 'styled-components';

export default function TaskCardEditor({
  desc,
  due,
  onDescChange,
  onDueChange,
  onSaveEdit,
  onCancelEdit,
}) {
  return (
    <Card>
      <Header as="form" onSubmit={(e) => e.preventDefault()}>
        <Inputs>
          <DescInput
            autoFocus
            value={desc}
            onChange={(e) => onDescChange(e.target.value)}
            aria-label="Task description"
          />
          <DateInput
            type="date"
            value={due}
            onChange={(e) => onDueChange(e.target.value)}
            aria-label="Due date"
          />
        </Inputs>
      </Header>

      <Row>
        <Button
          onClick={onSaveEdit}
          disabled={!desc.trim()}
          aria-label="Save changes"
        >
          Save
        </Button>
        <Button onClick={onCancelEdit} aria-label="Cancel changes">
          Cancel
        </Button>
      </Row>
    </Card>
  );
}

const Card = styled.article`
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.lg};
  padding: ${(p) => (p.theme.space ? p.theme.space(1.5) : '12px')};
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${(p) => (p.theme.space ? p.theme.space(1) : '8px')};

  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? `color-mix(in srgb,
           color-mix(in srgb, ${theme.colors.surface} 80%, ${theme.colors.text} 20%) 40%,
           transparent
         )`
      : `color-mix(in srgb,
           color-mix(in srgb, ${theme.colors.background} 92%, ${theme.colors.text} 8%) 40%,
           transparent
         )`};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Inputs = styled.div`
  display: flex;
  align-items: stretch;
  gap: 8px;
  width: 100%;
`;

const DescInput = styled.input`
  flex: 1 1 0%;
  min-width: 0;
  height: 30px;
  box-sizing: border-box;
  padding: ${(p) => p.theme.space?.(0.5) ?? '4px'};
  padding-left: ${(p) => p.theme.space?.(1) ?? '8px'};
  border-radius: ${(p) => p.theme.radii.md};
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  &:focus {
    outline: 2px solid ${(p) => p.theme.colors.primary};
  }
`;

const DateInput = styled.input`
  flex: 0 0 auto;
  width: clamp(120px, 16ch, 200px);
  height: 30px;
  box-sizing: border-box;
  padding: ${(p) => p.theme.space?.(0.5) ?? '4px'};
  border-radius: ${(p) => p.theme.radii.md};
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  &:focus {
    outline: 2px solid ${(p) => p.theme.colors.primary};
  }
`;
