import React from 'react';
import TaskCard from './TaskCard';

export default function TaskListView({ tasks }) {
  return (
    <div role="list">
      {tasks.map((t) => (
        <div key={t.taskId} role="listitem" style={{ marginBottom: 12 }}>
          <TaskCard task={t} />
        </div>
      ))}
    </div>
  );
}
