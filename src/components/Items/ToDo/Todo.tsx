import React from "react";
import { ProjectType, Task } from "../../../data/Interfaces";
import { OneTask } from "../../Pages/Project/OneTask";
import { deleteTaskById } from "../../../client/client";

export interface TodoProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  project: ProjectType;
  selectedTask: string;
  setSelectedTask: (str: string) => void;
  setShowNewTask: (b: boolean) => void;
}

export const Todo = ({
  tasks,
  setTasks,
  project,
  selectedTask,
  setSelectedTask,
  setShowNewTask,
}: TodoProps) => {
  const deleteTask = (taskId: string) => {
    deleteTaskById(taskId, project.project_id!);
    let tempTasks = [...tasks];
    tempTasks = tempTasks.filter((t) => t.taskId != taskId);
    setTasks(tempTasks);
  };

  return (
    <div className="standard-container project-standard-container">
      <div className="standard-container-title">
        <h1>Tasks</h1>
      </div>
      <div className="project-tasksTodo-container">
        {tasks.map((t, index) => {
          return (
            <OneTask
              setSelected={setSelectedTask}
              task={t}
              key={index}
              deleteSelf={() => {
                deleteTask(t.taskId!);
              }}
            />
          );
        })}
      </div>
      <button onClick={() => setShowNewTask(true)}>new</button>
    </div>
  );
};
