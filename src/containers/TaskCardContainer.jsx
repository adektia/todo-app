import React from 'react';
import TaskCard from '../components/Task/TaskCard';
import { AppContext } from '../state/context';
import { TASK_DELETE, TASK_UPDATE, TASK_STATE_SET } from '../state/actions';

const STATES = ['TODO', 'IN PROGRESS', 'DONE'];
const LABEL = { TODO: 'Start', 'IN PROGRESS': 'Complete', DONE: 'Reset' };

const getNext = (curr) => {
  const i = STATES.indexOf(curr);
  return i === -1 ? 'TODO' : STATES[(i + 1) % STATES.length];
};

export default function TaskCardContainer({ task }) {
  const { dispatch } = React.useContext(AppContext);
  const originalDesc = task.description ?? '';
  const originalDue = task.dueDate ?? '';

  const [isEditing, setIsEditing] = React.useState(false);
  const [desc, setDesc] = React.useState(originalDesc);
  const [due, setDue] = React.useState(originalDue);

  React.useEffect(() => {
    if (!isEditing) {
      setDesc(originalDesc);
      setDue(originalDue);
    }
  }, [originalDesc, originalDue, isEditing]);

  const upcomingState = React.useMemo(() => getNext(task.state), [task.state]);
  const nextStateLabel = React.useMemo(() => LABEL[task.state], [task.state]);

  const onStartEdit = () => setIsEditing(true);
  const onCancelEdit = () => {
    setDesc(originalDesc);
    setDue(originalDue);
    setIsEditing(false);
  };

  const onSaveEdit = () => {
    const trimmed = desc.trim();
    if (!trimmed) return;
    const changedDesc = trimmed !== originalDesc;
    const changedDue = due !== originalDue;
    if (changedDesc || changedDue) {
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

  const onDelete = () => {
    dispatch({ type: TASK_DELETE, payload: task.taskId });
  };

  const onNextState = () => {
    dispatch({
      type: TASK_STATE_SET,
      payload: { taskId: task.taskId, state: upcomingState },
    });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancelEdit();
    }
  };

  return (
    <TaskCard
      description={originalDesc}
      dueDate={originalDue}
      state={task.state}
      isEditing={isEditing}
      desc={desc}
      due={due}
      onStartEdit={onStartEdit}
      onCancelEdit={onCancelEdit}
      onSaveEdit={onSaveEdit}
      onDelete={onDelete}
      onDescChange={setDesc}
      onDueChange={setDue}
      onNextState={onNextState}
      nextStateLabel={nextStateLabel}
      upcomingState={upcomingState}
      onKeyDown={onKeyDown}
    />
  );
}
