// React & Third-Party Libraries Imports
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

// Project Utilities & API Helpers Imports
import { deleteTask, toggleTaskStatus } from "@utils/api/todoService";

// Components Imports
import CustomShowTitleAndDesc from "@components/utils/custom_show_title_&_desc/CustomShowTitleAndDesc";
import RenderInput from "@components/utils/render-input/RenderInput";
import RenderTooltipButton from "@components/utils/render-tooltip/RenderTooltipButton";

const TaskItem = ({ item, setTasks }) => {
  const navigate = useNavigate();

  const handleStatusChange = async () => {
    const updatedStatus = item.status === "pending" ? "completed" : "pending";

    try {
      await toggleTaskStatus(item.id, { ...item, status: updatedStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === item.id ? { ...task, status: updatedStatus } : task
        )
      );
    } catch (error) {
      console.error("Toggle Task Status Error:", error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Delete Task Error:", error.message);
    }
  };

  return (
    <li className={"task " + (item.status === "completed" ? "disabled" : "")}>
      <div className="task_index">
        <RenderInput
          type="checkbox"
          name="task_index"
          id="task_index"
          checked={item.status === "completed"}
          onChange={handleStatusChange}
          className="checkbox-btn"
        />
      </div>

      <div className="title">
        <CustomShowTitleAndDesc text={item.task_title} />
      </div>
      <div className="desc">
        <CustomShowTitleAndDesc text={item.task_desc} limit={50} />
      </div>
      <div className="actions">
        <div className="left">
          <RenderTooltipButton
            id="priority"
            name="priority"
            className={item.priority}
            text={item.priority}
            disabled={item.status === "completed"}
            toolTipText={"Priority"}
          />
        </div>
        <div className="right">
          <RenderTooltipButton
            id="edit_btn"
            name="edit_btn"
            className="primary edit"
            onClick={() => navigate(`/update/${item.id}`)}
            disabled={item.status === "completed"}
            showIcon={true}
            icon={MdEdit}
            toolTipText={"Edit Task"}
          />
          <RenderTooltipButton
            id="delete_btn"
            name="delete_btn"
            className="danger delete"
            onClick={() => handleDeleteTask(item.id)}
            showIcon={true}
            icon={MdDelete}
            toolTipText={"Delete Task"}
          />
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
