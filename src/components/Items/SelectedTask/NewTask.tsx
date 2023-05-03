import React from "react";

export interface NewTaskPrompts {
    addTask : (e: React.FormEvent<HTMLFormElement>) => void;
}

export const NewTask = ({addTask} : NewTaskPrompts) => {
  return (
    <>
      <div className="standard-container-title">
        <h1>New task</h1>
      </div>
      <div className="add-task-container ">
        <form className="add-task-form" onSubmit={addTask}>
          <label className="form-title">Task title</label>
          <input
            className="new-project-input box"
            placeholder="Input task title ..."
            type="text"
            name="title"
          />
          <label className="form-title">Estimated time</label>
          <input
            className="new-project-input box"
            type="number"
            name="time"
            placeholder="Estimated time ..."
          />
          <label className="form-title">Description</label>
          <input
            className="new-project-input box"
            type="text"
            name="description"
            placeholder="Description"
          />
          <div>
            <button
              className="standard-container-button left medium"
              type="button"
            >
              Cancel
            </button>
            <button
              className="standard-container-button right medium"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
