import React from 'react';
import TaskForm from '../components/Task/TaskForm';
import { AppContext } from '../state/context';
import { TASK_ADD } from '../state/actions';

function makeId() {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function TaskFormContainer() {
  const { dispatch } = React.useContext(AppContext);
  const [description, setDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const now = Date.now();
    dispatch({
      type: TASK_ADD,
      payload: {
        taskId: makeId(),
        userId: 'user_1',
        description: description.trim(),
        dueDate: dueDate || undefined,
        state: 'TODO',
        createdAt: now,
        updatedAt: now,
      },
    });

    setDescription('');
    setDueDate('');
  };

  return (
    <TaskForm
      description={description}
      dueDate={dueDate}
      onDescriptionChange={(e) => setDescription(e.target.value)}
      onDueDateChange={(e) => setDueDate(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
}
