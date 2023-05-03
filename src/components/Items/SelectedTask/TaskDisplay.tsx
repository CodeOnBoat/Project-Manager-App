import React, { useContext } from "react";
import { Step, Task } from "../../../data/Interfaces";
import Trash from "../../../data/images/trash.png";
import { ProjectContext } from "../../../context/ProjectContext";
import { changeCompletionOfStep } from "../../../client/client";

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
  const { setTasks, tasks, project } = useContext(ProjectContext);

  const modifyStepState = (step: Step) => {
    const tempTasks = [...tasks];
    tempTasks
      .filter((t) => t.taskId === task.taskId)[0]
      .steps.filter((s) => s.name === step.name)[0].completed = !step.completed;
    setTasks(tempTasks);
    changeCompletionOfStep(project?.project_id!, task.taskId!, step.name);
  };

  return (
    <>
      <div className="standard-container-title task-name">
        <h1>{task.title}</h1>
        <img
          className="standard-container-title-icon"
          src={Trash}
          onClick={() => deleteTask(task.taskId!)}
        />
      </div>
      <div className={`task-state-container ${task.state}`}>
        <label>
          {task.state === "notstarted" && "Not started"}
          {task.state === "inprogress" && `In progress by ${task.collaborator}`}
          {task.state === "finished" && `Finished by ${task.collaborator}`}
        </label>
      </div>
      <div className="task-detail-container">
        <div className="task-description">{task.description}</div>
        {task.steps && (
          <>
            <div className="links-container">
              <label>Here's the steps to follow:</label>
              {task.steps.map((step, i) => (
                <div className="step-container">
                  <div className="step-number">{i + 1}</div>
                  <div className="step">
                    <div className="step-data-container">
                      <label>
                        <b>{step.name}</b>
                      </label>
                      <a target="_blank" className="link" href={step.link}>
                        {step.linkname}
                      </a>
                    </div>
                  </div>
                  {task.state === "inprogress" && (
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onChange={() => modifyStepState(step)}
                    />
                  )}
                </div>
              ))}
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
