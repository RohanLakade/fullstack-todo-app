// React & Third-Party Libraries Imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Project Utilities & API Helpers Imports
import { fetchTaskById, addTask, updateTask } from "@utils/api/todoService";
import { priorityOptionsArr } from "@utils/helpers/helpers";

// Components Imports
import RenderInput from "@components/utils/render-input/RenderInput";
import RenderButton from "@components/utils/render_button/RenderButton";
import RenderTextArea from "@components/utils/render-text-area/RenderTextArea";
import RenderSelect from "@components/utils/render-select/RenderSelect";

// Component Styles Imports
import "./AddAndUpdateTask.scss";

const AddAndUpdateTask = ({ page = "add" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (page === "update") {
      const loadTask = async () => {
        try {
          const task = await fetchTaskById(id);
          setValue("task_title", task[0].task_title);
          setValue("task_desc", task[0].task_desc);
          setValue("priority", task[0].priority);
        } catch (error) {
          console.error("Fetch Task Error:", error.message);
        } finally {
          setLoading(false);
        }
      };
      loadTask();
    } else {
      setLoading(false);
    }
  }, [id, page, setValue]);

  const onSubmit = async (data) => {
    try {
      if (page === "add") {
        await addTask(data);
        alert("Task added successfully!");
      } else {
        await updateTask(id, data);
        alert("Task updated successfully!");
      }
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error(
        `${page === "add" ? "Add" : "Update"} Task Error:`,
        error.message
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <RenderInput
            id="task_title"
            {...register("task_title", {
              required: "Title cannot be empty",
            })}
            placeholder="Enter Title"
          />
          {errors.task_title ? (
            <div className={"error-msg"}>{errors?.task_title?.message}</div>
          ) : (
            <div className={"error-msg"}>&nbsp;</div>
          )}
        </div>
        <div>
          <RenderTextArea
            {...register("task_desc", {
              required: "Desc cannot be empty",
            })}
            placeholder={"Enter Desc"}
          />
          {errors.task_desc ? (
            <div className={"error-msg"}>{errors?.task_desc?.message}</div>
          ) : (
            <div className={"error-msg"}>&nbsp;</div>
          )}
        </div>
        <div>
          <RenderSelect
            {...register("priority", { required: true })}
            optionsArr={priorityOptionsArr.filter((x) => x.value !== "all")}
          />
        </div>
        <div className="actions">
          <RenderButton
            type={"button"}
            className={"brand-color"}
            text="Back"
            onClick={() => navigate("/dashboard")}
          />
          <RenderButton
            type={"submit"}
            className={"brand-color"}
            text={page === "add" ? "Add Task" : "Update Task"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddAndUpdateTask;
