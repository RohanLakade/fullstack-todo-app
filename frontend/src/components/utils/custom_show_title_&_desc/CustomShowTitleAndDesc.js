import React, { useState } from "react";
import RenderButton from "../render_button/RenderButton";

const CustomShowTitleAndDesc = ({ text, limit = 20 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {isExpanded
        ? text
        : text.slice(0, limit) + (text.length > limit ? "..." : "")}
      {text.length > limit && (
        <RenderButton
          className="read-more"
          onClick={() => setIsExpanded(!isExpanded)}
          text={isExpanded ? "Read Less" : "Read More"}
        />
      )}
    </>
  );
};

export default React.memo(CustomShowTitleAndDesc);
