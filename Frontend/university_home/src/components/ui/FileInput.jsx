import React from 'react';

function FileInput({ label, onChange, accept }) {
  return (
    <label className="form-control">
      <span className="form-label">{label}</span>
      <input
        type="file"
        className="form-input"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        accept={accept}
      />
    </label>
  );
}

export default FileInput;
