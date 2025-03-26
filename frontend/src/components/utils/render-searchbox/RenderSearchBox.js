import { MdSearch } from "react-icons/md";
import "./RenderSearchBox.scss";
import RenderInput from "../render-input/RenderInput";
import { getFromLocalStorage, setToLocalStorage } from "@utils/helpers/helpers";
import { useEffect, useState } from "react";
import RenderTooltipButton from "../render-tooltip/RenderTooltipButton";
import { AiOutlineClear } from "react-icons/ai";

const RenderSearchBox = ({ setDebounceQuery }) => {
  const [searchVal, setSearchVal] = useState(
    getFromLocalStorage("searchVal") || ""
  );

  // debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchVal);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchVal]);

  // handle search
  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    setToLocalStorage("searchVal", e.target.value);
  };

  const onClearBtnClick = () => {
    setSearchVal("");
    setToLocalStorage("searchVal", "");
  };

  return (
    <>
      <div className="search-box">
        <MdSearch className="icon" size={"0.875rem"} />
        <RenderInput
          type="text"
          id="search_input"
          name="search_input"
          className={"search-input"}
          placeholder="Search Google or type a URL"
          onChange={handleSearch}
          value={searchVal}
        />
      </div>
      <div className={"search-query " + (searchVal ? "visible" : "hidden")}>
        <span> Showing Results For: {searchVal}</span>
        <RenderTooltipButton
          className="brand-color"
          onClick={onClearBtnClick}
          icon={AiOutlineClear}
          showIcon={true}
          toolTipText={"Clear Search"}
        />
      </div>
    </>
  );
};

export default RenderSearchBox;
