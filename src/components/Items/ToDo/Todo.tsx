import React from "react";
import { ProjectType, Task } from "../../../data/Interfaces";
import { OneTask } from "../../Pages/Project/OneTask";
import { deleteTaskById } from "../../../client/client";
import "./ToDo.css";
import { ProjectContext } from "../../../context/ProjectContext";
import { useContext } from "react";
import Spinner from "../Spinner/Spinner";
import { Gear } from "../Gear/Gear";
export interface TodoProps {
  selectedTask: string;
  tasksLoading: boolean;
  setSelectedTask: (str: string) => void;
  setShowNewTask: (b: boolean) => void;
}

export const Todo = ({
  selectedTask,
  setSelectedTask,
  setShowNewTask,
  tasksLoading,
}: TodoProps) => {
  const { tasks } = useContext(ProjectContext);

  return (
    <div className="standard-container project-standard-container taller">
      {tasksLoading && (
        <div className="todo-loading-container">
          <Gear />
        </div>
      )}
      {!tasksLoading && (
        <>
          <div className="standard-container-title">
            <h1>Tasks</h1>
          </div>
          {tasks.filter(
            (t) => t.state === "notstarted" || t.state === "inprogress"
          ).length !== 0 ? (
            <div className="project-tasksTodo-container">
              {tasks
                .filter(
                  (t) => t.state === "notstarted" || t.state === "inprogress"
                )
                .map((t, index) => {
                  return (
                    <OneTask
                      setSelected={setSelectedTask}
                      task={t}
                      key={index}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="no-task-yet">No task yet</div>
          )}
          <div className="standard-container-button left medium">
            {
              tasks.filter(
                (t) => t.state === "notstarted" || t.state === "inprogress"
              ).length
            }{" "}
            Tasks
          </div>
          <button
            onClick={() => setShowNewTask(true)}
            className="standard-container-button right small"
          >
            +
          </button>
        </>
      )}
    </div>
  );
};
