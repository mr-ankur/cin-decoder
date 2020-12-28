import React from "react";

export const textField = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        className="search-field"
        {...input}
        placeholder={label}
        type="text"
      />
      {touched &&
        ((error && <span style={{ color: "red" }}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
