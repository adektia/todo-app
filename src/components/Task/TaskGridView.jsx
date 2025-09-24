import React from 'react';
import TaskCard from './TaskCard';

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
        <TaskCard key={t.taskId} task={t} />
      ))}
    </div>
  );
}
