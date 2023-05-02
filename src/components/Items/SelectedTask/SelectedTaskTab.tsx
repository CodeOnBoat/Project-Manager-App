import React from "react";
import { ProjectType, Task } from "../../../data/Interfaces";
import DonautChart from "../Chart/DonautChart";
import {
  addTaskToProject,
  updateTaskStatus,
  deleteTaskById,
} from "../../../client/client";
import "./SelectedTask.css";
import { useContext } from "react";
import { ProjectContext } from "../../../context/ProjectContext";
import Bin from "../../../data/images/bin.png";
export interface SelectedTaskTabProps {
  task: Task;
  updateTaskState: (status: string) => void;
  showNewTask: boolean;
  setShowNewTask: (b: boolean) => void;
}

export const SelectedTaskTab = ({
  task,
  updateTaskState,
  showNewTask,
  setShowNewTask,
}: SelectedTaskTabProps) => {
  const { project, tasks, setTasks } = useContext(ProjectContext);

  const changeTaskStatus = (status: string) => {
    updateTaskStatus(task.taskId!, project!.project_id!, status);
    updateTaskState(status);
  };

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask: Task = {
      title: formData.get("title") as string,
      time: parseInt(formData.get("time") as string),
      assignedTo: "",
      state: "notstarted",
      description: "",
      emoji: "",
      steps: [],
    };
    const updateTasks = async () => {
      const newT: Task = await addTaskToProject(project!.project_id!, newTask);
      setTasks([...tasks, newT]);
    };
    updateTasks();
    setShowNewTask(false);
  };
  const deleteTask = (taskId: string) => {
    deleteTaskById(taskId, project!.project_id!);
    let tempTasks = [...tasks];
    tempTasks = tempTasks.filter((t) => t.taskId != taskId);
    setTasks(tempTasks);
  };
  return (
    <div className="standard-container project-standard-container taller">
      {task && (
        <>
          <div className="standard-container-title">
            <h1>{task.title}</h1>
            <img
              className="standard-container-title-icon"
              src={Bin}
              onClick={() => deleteTask(task.taskId!)}
            />
          </div>
          <div className="task-state-container">
            <label>
              {task.state === "notstarted" && "Not started"}
              {task.state === "inprogress" && "In progress"}
              {task.state === "finished" && "Finished"}
            </label>
          </div>
          <div className="task-detail-container">
            <div className="task-description">{task.description}</div>
            {task.steps.length > 0 && (
              <>
                <div className="links-container">
                  <label>Here's the steps to follow:</label>
                  <ul>
                    {task.steps.map((step) => (
                      <li className="step">
                        <label>
                          <b>{step.name}</b>
                        </label>
                        <a target="_blank" className="link" href={step.link}>
                          {step.linkname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <button className="standard-container-button left">Cancel</button>
            <button
              className="standard-container-button right"
              onClick={() => changeTaskStatus("inprogress")}
            >
              start
            </button>
          </div>
        </>
      )}
      {!task && !showNewTask && (
        <label className="no-task-yet">no task selected</label>
      )}
      {showNewTask && (
        <>
          <div className="standard-container-title">
            <h1>New task</h1>
          </div>
          <div className="add-task-container ">
            <form className="add-task-form" onSubmit={addTask}>
              <label className="form-title">Task title</label>
              <input
                className="new-project-input box"
                placeholder="Input task title ..."
                type="text"
                name="title"
              />
              <label className="form-title">Estimated time</label>
              <input
                className="new-project-input box"
                type="number"
                name="time"
                placeholder="Input estimated time ..."
              />
              <div>
                <button
                  className="standard-container-button left medium"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="standard-container-button right medium"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
