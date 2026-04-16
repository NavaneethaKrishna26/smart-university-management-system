import React from 'react';

function DatePicker({ label, value, onChange }) {
  return (
    <label className="form-control">
      <span className="form-label">{label}</span>
      <input
        type="date"
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default DatePicker;
