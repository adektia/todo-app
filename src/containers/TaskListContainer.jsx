import React from 'react';
import { AppContext } from '../state/context';
import TaskListView from '../components/Task/TaskListView';
import TaskGridView from '../components/Task/TaskGridView';
import { EmptyState, NoResults } from '../components/EmptyState';

export default function TaskListContainer() {
  const { state } = React.useContext(AppContext);
  const {
    tasks,
    prefs: { layout, searchQuery },
  } = state;

  const filtered = tasks.filter((t) =>
    t.description.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  if (!filtered.length) return <EmptyState />;
  if (!filtered.length) return <NoResults />;

  return layout === 'grid' ? (
    <TaskGridView tasks={filtered} />
  ) : (
    <TaskListView tasks={filtered} />
  );
}
