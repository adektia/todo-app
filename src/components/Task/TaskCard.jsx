import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../../state/context';
import { TASK_DELETE, TASK_UPDATE, TASK_STATE_SET } from '../../state/actions';
import Button from '../Button';

const STATES = ['TODO', 'IN PROGRESS', 'DONE'];

function getNextState(curr) {
  const i = STATES.indexOf(curr);
  return i === -1 ? 'TODO' : STATES[(i + 1) % STATES.length];
}

function nextStateLabel(curr) {
  switch (curr) {
    case 'TODO':
      return 'Start';
    case 'IN PROGRESS':
      return 'Complete';
    case 'DONE':
      return 'Reset';
    default:
      return 'Next State';
  }
}

export default function TaskCard({ task }) {
  const { dispatch } = React.useContext(AppContext);
  const dueDate = task.dueDate ?? '';
  const description = task.description ?? '';

  const [isEditing, setIsEditing] = React.useState(false);
  const [desc, setDesc] = React.useState(description);
  const [due, setDue] = React.useState(dueDate);

  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    setDesc(description);
    setDue(dueDate);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const trimmed = desc.trim();
    if (!trimmed) return;
    if (trimmed !== description || due !== dueDate) {
      dispatch({
        type: TASK_UPDATE,
        payload: {
          taskId: task.taskId,
          description: trimmed,
          dueDate: due || undefined,
        },
      });
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch({ type: TASK_DELETE, payload: task.taskId });
  };

  const handleNextState = () => {
    const next = getNextState(task.state);
    dispatch({
      type: TASK_STATE_SET,
      payload: { taskId: task.taskId, state: next },
    });
  };

  return (
    <Card>
      <Header>
        {isEditing ? (
          <Inputs>
            <DescInput
              autoFocus
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              aria-label="Task description"
            />
            <DateInput
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              aria-label="Due date"
            />
          </Inputs>
        ) : (
          <>
            <Content>
              <Description title={description}>{description}</Description>
              {dueDate ? <Due>Due: {dueDate}</Due> : null}
            </Content>
            <Badge data-state={task.state}>{task.state}</Badge>
          </>
        )}
      </Header>

      <Row>
        {isEditing ? (
          <>
            <Button
              onClick={saveEdit}
              disabled={!desc.trim()}
              aria-label="Save changes"
            >
              Save
            </Button>
            <Button onClick={cancelEdit} aria-label="Cancel changes">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={startEdit} aria-label="Edit card">
              Edit
            </Button>
            <Button onClick={handleDelete} aria-label="Delete card">
              Delete
            </Button>
            <Button
              onClick={handleNextState}
              aria-label={`Set status to ${getNextState(task.state)}`}
            >
              {nextStateLabel(task.state)}
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
  border: 1px solid
    ${({ theme, ['data-state']: s }) =>
      s === 'DONE'
        ? theme.status.done.bd
        : s === 'IN PROGRESS'
          ? theme.status.inProgress.bd
          : theme.status.todo.bd};
  background: ${({ theme, ['data-state']: s }) =>
    s === 'DONE'
      ? theme.status.done.bg
      : s === 'IN PROGRESS'
        ? theme.status.inProgress.bg
        : theme.status.todo.bg};
  color: ${({ theme, ['data-state']: s }) =>
    s === 'DONE'
      ? theme.status.done.fg
      : s === 'IN PROGRESS'
        ? theme.status.inProgress.fg
        : theme.status.todo.fg};
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
