import React from 'react';

function Select({ label, options, value, onChange, placeholder, disabled }) {
  return (
    <label className="form-control">
      <span className="form-label">{label}</span>
      <select
        className="form-select"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder || 'Select'}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
