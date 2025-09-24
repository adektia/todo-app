import React from 'react';
import TaskCardContainer from '../../containers/TaskCardContainer';

export default function TaskGridView({ tasks }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 12,
      }}
    >
      {tasks.map((t) => (
        <TaskCardContainer key={t.taskId} task={t} />
      ))}
    </div>
  );
}
