import React, { useContext } from "react";
import { Task } from "../../data/Interfaces";

export interface MessageTaskProps {
  task: Task;
}

export const MessageTask = ({
  task,
}: MessageTaskProps) => {

  return (
    <div className="dark-bg">
     <h1>{task.title}</h1>
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
                </div>
              ))}
            </div>
          </>
        )}
     
      </div>
    </div>
  );
};