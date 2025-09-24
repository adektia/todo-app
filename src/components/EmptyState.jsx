import React from 'react';

export function EmptyState() {
  return <p style={{ opacity: 0.7 }}>No tasks created yet.</p>;
}

export function NoResults() {
  return <p style={{ opacity: 0.7 }}>No tasks match your search.</p>;
}
