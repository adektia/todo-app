import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button';

export default function TaskCard({
  description,
  dueDate,
  state,
  isEditing,
  desc,
  due,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  onDescChange,
  onDueChange,
  onNextState,
  nextStateLabel,
  upcomingState,
}) {
  return (
    <Card>
      <Header
        as={isEditing ? 'form' : 'div'}
        onSubmit={(e) => e.preventDefault()}
      >
        {isEditing ? (
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
        ) : (
          <>
            <Content>
              <Description title={description}>{description}</Description>
              {dueDate ? <Due>Due: {dueDate}</Due> : null}
            </Content>
            <Badge $state={state}>{state}</Badge>
          </>
        )}
      </Header>

      <Row>
        {isEditing ? (
          <>
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
          </>
        ) : (
          <>
            <Button onClick={onStartEdit} aria-label="Edit card">
              Edit
            </Button>
            <Button onClick={onDelete} aria-label="Delete card">
              Delete
            </Button>
            <Button
              onClick={onNextState}
              aria-label={`Set status to ${upcomingState}`}
            >
              {nextStateLabel}
            </Button>
          </>
        )}
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

const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;

  ${({ theme, $state }) => {
    const map = {
      DONE: theme.status.done,
      'IN PROGRESS': theme.status.inProgress,
      TODO: theme.status.todo,
    };
    const s = map[$state] ?? theme.status.todo;
    return css`
      border: 1px solid ${s.bd};
      background: ${s.bg};
      color: ${s.fg};
    `;
  }}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
`;

const Description = styled.strong`
  font-weight: 700;
  display: block;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Due = styled.small`
  display: block;
  opacity: 0.7;
  white-space: nowrap;
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
