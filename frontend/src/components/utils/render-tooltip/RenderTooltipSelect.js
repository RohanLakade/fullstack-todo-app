import { sortOptionsArr } from "@utils/helpers/helpers";
import RenderSelect from "../render-select/RenderSelect";
import "./RenderTooltipSelect.scss";

const RenderTooltipSelect = ({ toolTipText, ...rest }) => {
  return (
    <div className="tooltip-container">
      <RenderSelect {...rest} optionsArr={sortOptionsArr} />
      <span className="tooltip-text">{toolTipText}</span>
    </div>
  );
};

export default RenderTooltipSelect;
