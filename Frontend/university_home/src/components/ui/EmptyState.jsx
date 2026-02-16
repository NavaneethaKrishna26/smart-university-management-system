import React from 'react';

function EmptyState({ title = 'No data', message, action, children }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{children || '📭'}</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action && action}
    </div>
  );
}

export default EmptyState;
