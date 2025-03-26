import React from "react";
import "./RenderButton.scss";

const RenderButton = ({
  type = "button",
  id = "",
  name = "",
  value = "",
  className,
  onClick = () => {},
  text = "",
  disabled,
  showIcon = false,
  icon,
  iconSize = "0.875rem",
  left = true,
  onClickIcon = () => {},
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={"btn " + className}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
    >
      <span>
        {showIcon &&
          left &&
          icon &&
          React.createElement(icon, {
            size: iconSize,
            className: "icon",
            onClick: onClickIcon,
          })}
        {text !== "" && <span className="text">{text}</span>}
        {showIcon &&
          !left &&
          icon &&
          React.createElement(icon, {
            size: iconSize,
            className: "icon",
            onClick: onClickIcon,
          })}
      </span>
    </button>
  );
};

export default RenderButton;
