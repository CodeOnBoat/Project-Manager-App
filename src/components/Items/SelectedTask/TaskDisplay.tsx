import React, { useContext } from "react";
import { Step, Task } from "../../../data/Interfaces";
import Trash from "../../../data/images/trash.png";
import { ProjectContext } from "../../../context/ProjectContext";
import { changeCompletionOfStep } from "../../../client/client";
import LogoSmall from "../../../data/images/logoSmall.png";
import { chatWithProjectAssistent } from "../../../client/client";

export interface TaskDisplayProps {
  task: Task;
  deleteTask: (id: string) => void;
  changeTaskStatus: (str: string) => void;
  setHome: (b: boolean) => void;
  setLoading: (b: boolean) => void;
}

export const TaskDisplay = ({
  task,
  deleteTask,
  changeTaskStatus,
  setHome,
  setLoading,
}: TaskDisplayProps) => {
  const { setTasks, tasks, project, setMessages, messages } =
    useContext(ProjectContext);

  const modifyStepState = (step: Step) => {
    const tempTasks = [...tasks];
    tempTasks
      .filter((t) => t.taskId === task.taskId)[0]
      .steps.filter((s) => s.name === step.name)[0].completed = !step.completed;
    setTasks(tempTasks);
    changeCompletionOfStep(project?.project_id!, task.taskId!, step.name);
  };

  const handleGetAssistance = (step?: string) => {
    setHome(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step) {
        setMessages([
          ...messages,
          {
            content: `How can I help you with the step "${step}" of the task "${task.title}"?`,
            role: "assistant",
          },
        ]);
      } else {
        setMessages([
          ...messages,
          {
            content: `How can I help you with the task "${task.title}"?`,
            role: "assistant",
          },
        ]);
      }
    }, 2000);
  };

  return (
    <>
      <div className="standard-container-title task-name">
        <img
          src={LogoSmall}
          alt=""
          className="header-logo-image smaller hover"
          onClick={() => handleGetAssistance()}
        />
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
                      <p>{step.description}</p>
                    </div>
                    <img
                      src={LogoSmall}
                      alt=""
                      className="header-logo-image smaller hover shadow"
                      onClick={() => handleGetAssistance(step.name)}
                    />
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
        {task.state !== "notstarted" && (
          <button
            className="standard-container-button left medium"
            onClick={() =>
              changeTaskStatus(
                task.state === "inprogress" ? "notstarted" : "inprogress"
              )
            }
          >
            Back
          </button>
        )}
        {task.state !== "finished" && (
          <button
            className="standard-container-button right medium"
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
