import React, { useContext } from "react";
import { Task } from "../../data/Interfaces";

export interface MessageTaskProps {
  task: Task;
}

export const MessageTask = ({ task }: MessageTaskProps) => {
  return (
    <div className="dark-bg">
      <h1 className="message-task-title">{task.title}</h1>
      <div className="task-detail-container" style={{paddingRight : '5px', paddingLeft : '5px'}}>
        <div className="task-description">{task.description}</div>
        {task.steps && (
          <>
            <div className="links-container">
              <label>Here's the steps to follow:</label>
              {task.steps.map((step, i) => (
                <div className="step task-message">
                  <div className="step-header-container">
                    <div className="step-number">{i + 1}</div>
                    <b>{step.name}</b>
                  </div>
                  <div className="step-data-container">
                    <p className="step-description"> {step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
