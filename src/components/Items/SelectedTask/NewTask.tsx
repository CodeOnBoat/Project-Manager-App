import React, { useRef, useState } from "react";
import { Step, Task } from "../../../data/Interfaces";

export interface NewTaskPrompts {
  addTask: (t: Task) => void;
}

export const NewTask = ({ addTask }: NewTaskPrompts) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const estimatedTimeRef = useRef<HTMLInputElement>(null);
  const [steps, setSteps] = useState<Step[]>([]);

  const newTask = () => {
    const newTask: Task = {
      title: titleRef.current!.value,
      time: parseInt(estimatedTimeRef.current!.value),
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
    const tempSteps = steps;
    switch (element) {
      case "description":
        tempSteps[stepIndex].description = e.currentTarget.value;
        break;
      case "title":
        tempSteps[stepIndex].name = e.currentTarget.value;
        break;
    }
    setSteps([...tempSteps]);
  };

  const removeStep = (i: number) => {
    const tempSteps = [...steps];
    console.log("steps", steps);
    tempSteps.splice(i, 1);
    console.log("steps after", tempSteps);
    setSteps([...tempSteps]);
  };

  return (
    <>
      <div className="standard-container-title">
        <h1>New task</h1>
      </div>
      <div className="add-task-container ">
        <div className="add-task-form">
          <label className="form-title">Task title</label>
          <input
            className="standard-container-input box"
            placeholder="Input task title ..."
            type="text"
            name="title"
            ref={titleRef}
          />
          <label className="form-title">Estimated time</label>
          <input
            className="standard-container-input box"
            type="number"
            name="time"
            placeholder="Estimated time ..."
            ref={estimatedTimeRef}
          />
          <label className="form-title">Description</label>
          <input
            ref={descriptionRef}
            className="standard-container-input box"
            type="text"
            name="description"
            placeholder="Description"
          />
          <label className="form-title">Steps</label>
          <div>
            {steps.map((s, i) => {
              return (
                <div className="one-step">
                  <div className="step-number">{i + 1}</div>
                  <div className="delete-step" onClick={() => removeStep(i)}>
                    -
                  </div>
                  <input
                    className="standard-container-input box"
                    type="text"
                    placeholder="Step title"
                    onChange={(e) => modifyStep(e, "title", i)}
                    value={s.name}
                  />
                  <input
                    className="standard-container-input box"
                    type="text"
                    placeholder="Step description"
                    onChange={(e) => modifyStep(e, "description", i)}
                    value={s.description}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="plus-step"
            type="button"
            onClick={() =>
              setSteps([
                ...steps,
                { name: "", description: "", completed: false },
              ])
            }
          >
            +
          </button>

          <div>
            <button
              className="standard-container-button left medium"
              type="button"
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
    </>
  );
};
