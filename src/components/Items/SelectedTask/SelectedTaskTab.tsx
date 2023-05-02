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
import { NewTask } from "./NewTask";
import { TaskDisplay } from "./TaskDisplay";
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
        <TaskDisplay
          task={task}
          changeTaskStatus={changeTaskStatus}
          deleteTask={deleteTask}
        />
      )}
      {!task && !showNewTask && (
        <label className="no-task-yet">no task selected</label>
      )}
      {showNewTask && <NewTask addTask={addTask} />}
    </div>
  );
};
