// React & Third-Party Libraries Imports
import { MdShoppingBag } from "react-icons/md";

// Components Imports
import TaskItem from "../task-item/TaskItem";

const TaskListWrapper = ({ taskList = [], setTasks, view }) => {
  return (
    <ul className={"tasklist " + view}>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <TaskItem key={task.id} item={task} setTasks={setTasks} />
        ))
      ) : (
        <li className="empty">
          <div>
            <span>
              <MdShoppingBag />
            </span>
            <p>No Tasks</p>
          </div>
        </li>
      )}
    </ul>
  );
};

export default TaskListWrapper;
