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
import { AppContext } from "../../../context/AppContext";
export interface SelectedTaskTabProps {
  task: Task;
  updateTaskState: (status: string, collaborator: string) => void;
  showNewTask: boolean;
  setShowNewTask: (b: boolean) => void;
  setHome: (b: boolean) => void;
  setLoading: (b: boolean) => void;
}

export const SelectedTaskTab = ({
  task,
  updateTaskState,
  showNewTask,
  setShowNewTask,
  setHome,
  setLoading,
}: SelectedTaskTabProps) => {
  const { project, tasks, setTasks } = useContext(ProjectContext);
  const { profile } = useContext(AppContext);

  const changeTaskStatus = (status: string) => {
    updateTaskStatus(
      task.taskId!,
      project!.project_id!,
      status,
      profile?.name!
    );
    // updateTaskState(status, profile!.name);
  };

  const addTask = (newTask: Task) => {
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
    <>
      {task && (
        <TaskDisplay
          setLoading={setLoading}
          setHome={setHome}
          task={task}
          changeTaskStatus={changeTaskStatus}
          deleteTask={deleteTask}
        />
      )}
      {!task && !showNewTask && (
        <div className="standard-container project-standard-container taller">
          <label className="no-task-yet">no task selected</label>
        </div>
      )}
      {showNewTask && (
        <NewTask setShowNewTask={setShowNewTask} addTask={addTask} />
      )}
    </>
  );
};
