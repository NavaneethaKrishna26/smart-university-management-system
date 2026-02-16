import React from 'react';

function Loader({ size = 'md', text }) {
  const sizeClass = size === 'sm' ? 'loader-sm' : 'loader-md';
  return (
    <div className="loader-container">
      <div className={`loader ${sizeClass}`} />
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
}


export default Loader;
