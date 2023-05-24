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

  let counter = 0;
  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title">
        <h1>Completed tasks</h1>
      </div>
      {counter === 0 && (
        <div className="no-task-yet">Complete your first task</div>
      )}
      <div className="project-tasksTodo-container">
        {tasks
          .filter((t) => t.state === "finished")
          .map((t, index) => {
            counter++;
            return (
              <OneTask setSelected={setSelectedTask} task={t} key={index} />
            );
          })}

        <button className="standard-container-button medium right noHover">
          {counter} {counter == 1 ? "Task" : "Tasks"}
        </button>
      </div>
    </div>
  );
};
