import React from "react";
import { ProjectType, Task } from "../../../data/Interfaces";
import DonautChart from "../Chart/DonautChart";
import { addTaskToProject, updateTaskStatus } from "../../../client/client";

export interface SelectedTaskTabProps {
  task: Task;
  project: ProjectType;
  updateTaskState: (status: string) => void;
  showNewTask: boolean;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setShowNewTask: (b: boolean) => void;
}

export const SelectedTaskTab = ({
  task,
  project,
  updateTaskState,
  showNewTask,
  tasks,
  setTasks,
  setShowNewTask,
}: SelectedTaskTabProps) => {
  const changeTaskStatus = (status: string) => {
    updateTaskStatus(task.taskId!, project.project_id!, status);
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
    };
    const updateTasks = async () => {
      const newT: Task = await addTaskToProject(project.project_id!, newTask);
      setTasks([...tasks, newT]);
    };
    updateTasks();
    setShowNewTask(false);
  };
  return (
    <div className="standard-container standard-project-container">
      {task && (
        <>
          <div className="standard-container-title">
            <h1>{task.title}</h1>
          </div>
          {task.state === "notstarted" && (
            <button className="" onClick={() => changeTaskStatus("inprogress")}>
              start
            </button>
          )}
          {task.state === "inprogress" && (
            <>
              <DonautChart
                total={100}
                completed={90}
                size={200}
                strokeWidth={12}
                fontSize={30}
                fontColor="#fff"
                trackColor="rgba(0, 200, 0, 0)"
                progressColor="#fff"
              />
              <button className="standard-container-button">Break</button>
              <button
                className="standard-container-button"
                onClick={() => changeTaskStatus("finished")}
              >
                Done
              </button>
            </>
          )}
        </>
      )}
      {!task && !showNewTask && <label>no task selected</label>}
      {showNewTask && !task && (
        <>
          <div className="add-task-container ">
            <form onSubmit={addTask}>
              <label>title</label>
              <input type="text" name="title" />
              <label>time (hours)</label>
              <input type="number" name="time" />
              <button type="submit">submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
