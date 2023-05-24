import { useContext } from "react";
import { Step, Task } from "../../../data/Interfaces";
import Trash from "../../../data/images/trash.png";
import { ProjectContext } from "../../../context/ProjectContext";
import { changeCompletionOfStep } from "../../../client/client";
import { AppContext } from "../../../context/AppContext";

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
  const { setTasks, tasks, project, setMessages, messages, setTags } =
    useContext(ProjectContext);
  const { darkMode } = useContext(AppContext);

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
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

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
      setTags(["Explain me more", "Make it a task", "How can I start?"]);
    }, 1500);
  };

  return (
    <div className="standard-container project-standard-container taller">
      <div className="standard-container-title task-name">
        <h1>{task.title}</h1>
        <img
          className={`standard-container-title-icon ${darkMode}`}
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
        <div
          className="getHelp-container header "
          onClick={() => handleGetAssistance()}
        >
          <label className="getHelp-text header">Ask assistant</label>
        </div>
      </div>
      <div className="task-detail-container">
        <div className="task-description">{task.description}</div>
        {task.steps && (
          <>
            <div className="links-container">
              <label>Here's the steps to follow:</label>
              {task.steps.map((step, i) => (
                <div className="step-container">
                  <div className="step">
                    <div className="step-header-container">
                      <div className="step-number">{i + 1}</div>
                      <b>{step.name}</b>
                    </div>
                    <div className="step-data-container">
                      <p className="step-description"> {step.description}</p>
                    </div>
                    <div
                      className="getHelp-container"
                      onClick={() => handleGetAssistance(step.name)}
                    >
                      <label className="getHelp-text">Ask assistant</label>
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
    </div>
  );
};
