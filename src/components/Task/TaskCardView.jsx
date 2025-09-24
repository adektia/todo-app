import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button';

export default function TaskCardView({
  description,
  dueDate,
  state,
  onStartEdit,
  onDelete,
  onNextState,
  nextStateLabel,
  upcomingState,
}) {
  return (
    <Card>
      <Header>
        <Content>
          <Description title={description}>{description}</Description>
          {dueDate ? <Due>Due: {dueDate}</Due> : null}
        </Content>
        <Badge $state={state}>{state}</Badge>
      </Header>

      <Row>
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
