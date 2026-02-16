import React from 'react';

function Badge({ text, variant = 'default' }) {
  return <span className={`badge badge-${variant}`}>{text}</span>;
}

export default Badge;
