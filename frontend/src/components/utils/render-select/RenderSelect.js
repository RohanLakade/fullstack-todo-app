import "./RenderSelect.scss";

const RenderSelect = ({ optionsArr = [], ...rest }) => {
  return (
    <select {...rest}>
      {optionsArr.length > 0 &&
        optionsArr.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default RenderSelect;
