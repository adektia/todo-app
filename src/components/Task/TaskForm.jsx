import React from 'react';
import styled from 'styled-components';
import { SPACING } from '../../styles/tokens';
import Button from '../Button';

export default function TaskForm({
  description,
  dueDate,
  onDescriptionChange,
  onDueDateChange,
  onSubmit,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <StyledInput
        required
        placeholder="Task description"
        value={description}
        onChange={onDescriptionChange}
        aria-label="Task description"
        name="description"
      />
      <StyledInput
        type="date"
        value={dueDate}
        onChange={onDueDateChange}
        aria-label="Due date"
        name="dueDate"
      />
      <Button type="submit" disabled={!description.trim()}>
        Add
      </Button>
    </Form>
  );
}
const Form = styled.form`
  position: sticky;
  top: var(--toolbar-h);
  z-index: 9;
  background: ${(p) => p.theme.colors.background};
  padding-bottom: ${SPACING['2x']};
  padding-top: ${SPACING['1x']};

  display: flex;
  gap: ${SPACING['0.5x']};
`;

const StyledInput = styled.input`
  padding: ${SPACING['0.5x']};
  padding-left: ${SPACING['1x']};
  border-radius: ${(p) => p.theme.radii.md};
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  min-width: 160px;

  &:focus {
    outline: 2px solid ${(p) => p.theme.colors.primary};
  }
`;
