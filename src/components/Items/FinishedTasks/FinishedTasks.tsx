import React, { useContext } from "react";
import { ProjectType, Task } from "../../../data/Interfaces";
import { OneTask } from "../../Pages/Project/OneTask";
import { deleteTaskById } from "../../../client/client";
import { ProjectContext } from "../../../context/ProjectContext";
export interface FinishedTasksProps {
  selectedTask: string;
  setSelectedTask: (str: string) => void;
}

export const FinishedTasks = ({
  selectedTask,
  setSelectedTask,
}: FinishedTasksProps) => {
  const { tasks } = useContext(ProjectContext);

  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Completed tasks</h1>
      </div>
      <div className="project-tasksTodo-container">
        {tasks
          .filter((t) => t.state === "finished")
          .map((t, index) => {
            return (
              <OneTask setSelected={setSelectedTask} task={t} key={index} />
            );
          })}
      </div>
    </div>
  );
};
