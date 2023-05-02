import React, { useContext } from "react";
import { Step, Task } from "../../../data/Interfaces";
import Bin from "../../../data/images/bin.png";
import { ProjectContext } from "../../../context/ProjectContext";

export interface TaskDisplayProps {
  task: Task;
  deleteTask: (id: string) => void;
  changeTaskStatus: (str: string) => void;
}

export const TaskDisplay = ({
  task,
  deleteTask,
  changeTaskStatus,
}: TaskDisplayProps) => {
  const { setTasks, tasks } = useContext(ProjectContext);

  const modifyStepState = (step: Step) => {
    const tempTasks = tasks;
    tempTasks.forEach((t) => {
      if (t.taskId === task.taskId) {
        t.steps.forEach((s) => {
          if (s.name === step.name) {
            s.completed = !s.completed;
          }
        });
      }
    });
    setTasks(tempTasks);
  };

  return (
    <>
      <div className="standard-container-title">
        <h1>{task.title}</h1>
        <img
          className="standard-container-title-icon"
          src={Bin}
          onClick={() => deleteTask(task.taskId!)}
        />
      </div>
      <div className={`task-state-container ${task.state}`}>
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
                    <div className="step-data-container">
                      <label>
                        <b>{step.name}</b>
                      </label>
                      <a target="_blank" className="link" href={step.link}>
                        {step.linkname}
                      </a>
                    </div>
                    {task.state === "inprogress" && (
                      <input
                        type="checkbox"
                        onChange={() => modifyStepState(step)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        <button className="standard-container-button left">Cancel</button>
        {task.state !== "finished" && (
          <button
            className="standard-container-button right"
            onClick={() =>
              changeTaskStatus(
                task.state === "notstarted" ? "inprogress" : "finished"
              )
            }
          >
            {task.state === "notstarted" && "Start"}
            {task.state === "inprogress" && "Finish"}
          </button>
        )}
      </div>
    </>
  );
};
