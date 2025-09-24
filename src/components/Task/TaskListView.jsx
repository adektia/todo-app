import React from 'react';
import TaskCardContainer from '../../containers/TaskCardContainer';

export default function TaskListView({ tasks }) {
  return (
    <div role="list">
      {tasks.map((t) => (
        <div key={t.taskId} role="listitem" style={{ marginBottom: 12 }}>
          <TaskCardContainer task={t} />
        </div>
      ))}
    </div>
  );
}
