import React from "react";

export const textField = ({ input, label, meta: { touched, error, warning } }) => (
  <div className="text-field">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type="text" />
      {touched &&
        ((error && <span style={{ color: "red" }}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const emailField = ({ input, label, meta: { touched, error, warning } }) => (
  <div className="text-field">
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type="email"
      />
      {touched &&
        ((error && <span style={{ color: "red" }}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const passwordField = ({ input, label, meta: { touched, error, warning } }) => (
  <div className="text-field">
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type="password"
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
