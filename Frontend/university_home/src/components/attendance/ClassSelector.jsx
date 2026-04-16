import React from 'react';
import Select from '../ui/Select';

function ClassSelector({ classes, value, onChange }) {
  const options = classes.map((c) => ({
    value: String(c.id),
    label: c.name,
  }));
  return (
    <Select
      label="Class"
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select class"
    />
  );
}

export default ClassSelector;
