// React & Third-Party Libraries Imports
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

// Project Utilities & API Helpers Imports
import { fetchTasks, deleteAllTasks } from "@utils/api/todoService";

// Components Imports
import TaskListWrapper from "./tasklist-wrapper/TaskListWrapper";
import SortAndFilterOptions from "./sort-and-filter-options/SortAndFilterOptions";
import FilterModal from "@components/utils/dialog/filter_modal/FilterModal";
import RenderButton from "@components/utils/render_button/RenderButton";
import RenderSearchBox from "@components/utils/render-searchbox/RenderSearchBox";

// Component Styles Imports
import "./DashboardWrapper.scss";

const DashboardWrapper = () => {
  const [tasks, setTasks] = useState([]);

  const [view, setView] = useState("list");
  const [isDisabled, setIsDisabled] = useState(false);
  const [showFilterOptions, setshowFilterOptions] = useState(false);
  const [filteredList, setFilteredList] = useState(tasks);
  const [currentFilters, setCurrentFilters] = useState({
    status: "all",
    priority: "all",
  });

  const [sortOption, setSortOption] = useState("");
  const [sortedTaskList, setSortedTaskList] = useState(filteredList);

  const [debouncequery, setDebounceQuery] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const result = await fetchTasks();

        setTasks(result);
      } catch (error) {
        console.error("Fetch Tasks Error:", error.message);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    if (debouncequery) {
      setFilteredList(
        tasks.filter(
          (task) =>
            task?.task_title
              .toLowerCase()
              .includes(debouncequery.toLowerCase()) ||
            task?.task_desc.toLowerCase().includes(debouncequery.toLowerCase())
        )
      );
    } else {
      setFilteredList(tasks);
    }
    // eslint-disable-next-line
  }, [debouncequery, tasks]);

  useEffect(() => {
    const handleResize = (entries) => {
      const width = entries[0].contentRect.width;
      if (width < 576) {
        setView("list");
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      setFilteredList(getFilteredList(tasks, currentFilters));
    }
  }, [tasks, currentFilters]);

  const handleDeleteAllTask = async () => {
    if (!window.confirm("Are you sure you want to delete all task?")) return;

    try {
      await deleteAllTasks();
      setTasks([]);
    } catch (error) {
      console.error("Delete Task Error:", error.message);
    }
  };

  const handleApplyFilters = (selectedFilters) => {
    setFilteredList(getFilteredList(tasks, selectedFilters));
    setCurrentFilters(selectedFilters);
    setshowFilterOptions(false);
  };

  const handlClearFilter = (name) => {
    setCurrentFilters({ ...currentFilters, [name]: "all" });
  };

  const getFilteredList = (
    OriginalArray = [],
    filters = { status: "all", priority: "all" }
  ) => {
    if (filters.status === "all" && filters.priority === "all") {
      return OriginalArray;
    } else if (filters.status === "all" && filters.priority !== "all") {
      return OriginalArray.filter((task) => task.priority === filters.priority);
    } else if (filters.status !== "all" && filters.priority === "all") {
      return OriginalArray.filter((task) => task.status === filters.status);
    } else {
      return OriginalArray.filter(
        (task) =>
          task.status === filters.status && task.priority === filters.priority
      );
    }
  };

  const getSortedTasks = (tasks, option) => {
    if (!option) return tasks;

    return [...tasks].sort((a, b) => {
      const priorityOrder = { low: 1, medium: 2, high: 3 };

      if (option === "priority-asc")
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      if (option === "priority-desc")
        return priorityOrder[b.priority] - priorityOrder[a.priority];

      return 0; // Default, keeps the order if no valid sort option - recommended for multiple sort conditions
    });
  };

  useEffect(() => {
    setSortedTaskList(getSortedTasks(filteredList, sortOption));
  }, [sortOption, filteredList]);

  return (
    <div id="dashboard-wrapper">
      <section>
        <div className="search-wrapper">
          <RenderSearchBox setDebounceQuery={setDebounceQuery} />
        </div>
        <div className="sort-and-filter-options">
          <SortAndFilterOptions
            view={view}
            setView={setView}
            isDisabled={sortedTaskList.length === 0 ? true : isDisabled}
            handleDeleteAllTask={handleDeleteAllTask}
            showFilterOptions={showFilterOptions}
            setshowFilterOptions={setshowFilterOptions}
            handleApplyFilters={handleApplyFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
        <div className="tasklist-wrapper">
          <FilterModal
            filterObj={currentFilters}
            isOpen={showFilterOptions}
            onClose={() => setshowFilterOptions(false)}
            onApply={handleApplyFilters}
          />

          <div className="applied-filters">
            {(currentFilters.status !== "all" ||
              currentFilters.priority !== "all") && <h5>Applied Filters:</h5>}
            {currentFilters.status !== "all" && (
              <RenderButton
                className={"success"}
                text={"Status: " + currentFilters.status}
                showIcon={true}
                left={false}
                icon={MdClose}
                onClickIcon={() => handlClearFilter("status")}
              />
            )}
            {currentFilters.priority !== "all" && (
              <RenderButton
                className={"success"}
                text={"Priority: " + currentFilters.priority}
                showIcon={true}
                left={false}
                icon={MdClose}
                onClickIcon={() => handlClearFilter("priority")}
              />
            )}
            {(currentFilters.status !== "all" ||
              currentFilters.priority !== "all") && (
              <RenderButton
                className={"default"}
                text={"Clear All"}
                onClick={() =>
                  setCurrentFilters({
                    ...currentFilters,
                    status: "all",
                    priority: "all",
                  })
                }
              />
            )}
          </div>
          <TaskListWrapper
            taskList={sortedTaskList}
            setTasks={setTasks}
            view={view}
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardWrapper;
