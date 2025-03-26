import RenderButton from "../render_button/RenderButton";
import "./RenderTooltipButton.scss"

const RenderTooltipButton = ({ toolTipText, ...rest }) => {
  return (
    <div className="tooltip-container">
      <RenderButton {...rest} />
      <span className="tooltip-text">{toolTipText}</span>
    </div>
  );
};

export default RenderTooltipButton;
