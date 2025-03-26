// React & Third-Party Libraries Imports
import { useNavigate } from "react-router-dom";
import {
  MdAdd,
  MdDelete,
  MdFilterAlt,
  MdOutlineGridView,
  MdOutlineViewHeadline,
} from "react-icons/md";

// Project Utilities & API Helpers Imports
import { sortOptionsArr } from "@utils/helpers/helpers";

// Components Imports
import RenderTooltipSelect from "@components/utils/render-tooltip/RenderTooltipSelect";
import RenderTooltipButton from "@components/utils/render-tooltip/RenderTooltipButton";

// Component Styles Imports
import "./SortAndFilterOptions.scss";

const SortAndFilterOptions = ({
  view,
  setView,
  isDisabled,
  setshowFilterOptions,
  showFilterOptions,
  handleDeleteAllTask,
  sortOption,
  setSortOption,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <RenderTooltipButton
        id="add_new_task"
        name="add_new_task"
        className="add-new-task"
        onClick={() => navigate("/add")}
        icon={MdAdd}
        showIcon={true}
        toolTipText="Add New Task"
      />
      <RenderTooltipButton
        id="delete_all"
        name="delete_all"
        className="delete-all"
        onClick={handleDeleteAllTask}
        icon={MdDelete}
        showIcon={true}
        toolTipText="Delete All Task"
      />
      <RenderTooltipButton
        id="filter-options"
        name="filter-options"
        className="filter-options"
        onClick={() => setshowFilterOptions(!showFilterOptions)}
        icon={MdFilterAlt}
        showIcon={true}
        toolTipText="Filter Options"
      />
      <RenderTooltipSelect
        id="sort_by"
        name="sort_by"
        className="sort-by"
        onChange={(e) => setSortOption(e.target.value)}
        value={sortOption}
        optionsArr={sortOptionsArr}
        toolTipText="Sort Options"
      />
      <RenderTooltipButton
        id="view"
        name="view"
        className="view"
        onClick={() => setView(view === "list" ? "grid" : "list")}
        icon={view === "list" ? MdOutlineGridView : MdOutlineViewHeadline}
        showIcon={true}
        disabled={isDisabled}
        toolTipText={(view === "list" ? "Grid" : "List") + "-View"}
      />
    </>
  );
};

export default SortAndFilterOptions;
