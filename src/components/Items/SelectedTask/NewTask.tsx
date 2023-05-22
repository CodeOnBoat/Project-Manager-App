import React, { useContext, useEffect, useRef, useState } from "react";
import { Step, Task } from "../../../data/Interfaces";
import Trash from "../../../data/images/trash.png";
import { AppContext } from "../../../context/AppContext";
import { log } from "console";

export interface NewTaskPrompts {
  addTask: (t: Task) => void;
  setShowNewTask: (b: boolean) => void;
}

export const NewTask = ({ addTask, setShowNewTask }: NewTaskPrompts) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const { darkMode } = useContext(AppContext);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const estimatedTimeRef = useRef<HTMLInputElement>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const stepContainerRef = useRef<HTMLDivElement>(null);

  const newTask = () => {
    const newTask: Task = {
      title: titleRef.current!.value,
      time: 0,
      assignedTo: "",
      state: "notstarted",
      description: descriptionRef.current!.value,
      emoji: "",
      steps: steps,
      collaborator: "",
    };

    addTask(newTask);
  };

  const modifyStep = (
    e: React.ChangeEvent<HTMLInputElement>,
    element: string,
    stepIndex: number
  ) => {
    const tempSteps = [...steps];
    switch (element) {
      case "description":
        tempSteps[stepIndex].description = e.currentTarget.value;
        break;
      case "title":
        tempSteps[stepIndex].name = e.currentTarget.value;
        break;
    }
    setSteps(tempSteps);
  };

  const removeStep = (i: number) => {
    const tempSteps = [...steps];
    tempSteps.splice(i, 1);
    setSteps(tempSteps);
  };

  const addNewStep = () => {
    const newStep: Step = { name: "", description: "", completed: false };
    setSteps([...steps, newStep]);
  };

  useEffect(() => {
    console.log("sdasd");
    if (stepContainerRef.current) {
      stepContainerRef.current.scrollTo(
        0,
        stepContainerRef.current.scrollHeight
      );
    }
  }, [steps]);

  return (
    <div
      className="standard-container project-standard-container taller"
      ref={stepContainerRef}
    >
      <div className="standard-container-title">
        <h1>New task</h1>
      </div>
      <div className="add-task-container ">
        <div className="add-task-form">
          <div className="new-task-input-container">
            <label className="form-title">Task title</label>
            <input
              className="standard-container-input box"
              placeholder="Input task title ..."
              type="text"
              name="title"
              ref={titleRef}
            />
          </div>
          <div className="new-task-input-container">
            {/* <label className="form-title">Estimated time</label>
            <input
              className="standard-container-input box"
              type="number"
              name="time"
              placeholder="Estimated time ..."
              ref={estimatedTimeRef}
            /> */}
          </div>
          <div className="new-task-input-container">
            <label className="form-title">Description</label>
            <input
              ref={descriptionRef}
              className="standard-container-input box description"
              type="text"
              name="description"
              placeholder="Description"
            />
          </div>
          <div className="new-task-input-container">
            <label className="form-title">Steps</label>
            <div className="steps-container">
              {steps.map((s, i) => (
                <div className="one-step" key={i}>
                  <div className="one-new-step-header-container">
                    <div className="step-number">{i + 1}</div>
                    <div
                      className="delete-new-step"
                      onClick={() => removeStep(i)}
                    >
                      <img
                        src={Trash}
                        className={`delete-new-step ${darkMode}`}
                      />
                    </div>
                  </div>
                  <input
                    className="standard-container-input box full"
                    type="text"
                    placeholder="Step title"
                    onChange={(e) => modifyStep(e, "title", i)}
                    value={s.name}
                  />
                  <input
                    className="standard-container-input box full"
                    type="text"
                    placeholder="Step description"
                    onChange={(e) => modifyStep(e, "description", i)}
                    value={s.description}
                  />
                </div>
              ))}
            </div>
          </div>
          <button className="plus-step" type="button" onClick={addNewStep}>
            +
          </button>

          <div>
            <button
              className="standard-container-button left medium"
              type="button"
              onClick={() => setShowNewTask(false)}
            >
              Cancel
            </button>
            <button
              className="standard-container-button right medium"
              onClick={newTask}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
