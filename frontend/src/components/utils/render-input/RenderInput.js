import React from "react";
import "./RenderInput.scss";

const RenderInput = ({ type, id, name, placeholder, onChange, ...rest }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
      autoComplete="off"
    />
  );
};

export default RenderInput;
