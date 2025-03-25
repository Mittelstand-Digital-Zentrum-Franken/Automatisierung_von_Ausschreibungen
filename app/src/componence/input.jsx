import React from 'react';

function InputField({ label, id, value }) {
  return (
    <div className="info-item">
      <label htmlFor={id}>{label}:</label>
      <input
        type="text"
        id={id}
        value={value}
        className="info-input"
        readOnly
      />
    </div>
  );
}

export default InputField;
