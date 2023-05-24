import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { ProjectType } from "../../../data/Interfaces";
import { addNewProject, addNewProjectWithTasks } from "../../../client/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NewProject.css";
import { useRef } from "react";
import Spinner from "../Spinner/Spinner";
import { Gear } from "../Gear/Gear";

export interface NewProjectProps {
  handleCancelNewProject: () => void;
  setProjectLoading: Function;
}

export const NewProject = ({
  handleCancelNewProject,
  setProjectLoading,
}: NewProjectProps) => {
  const { projects, profile, setProjects } = useContext(AppContext);
  const navigate = useNavigate();
  const [emptyTitle, setEmptyTitle] = useState(false);
  const titleFieldRef = useRef<HTMLTextAreaElement>(null);
  const [isAiEnabled, setIsAiEnabled] = useState(false);

  const createNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("title") == "") {
      setEmptyTitle(true);
      titleFieldRef.current!.classList.add("error");
      setTimeout(() => {
        setEmptyTitle(false);
        titleFieldRef.current!.classList.remove("error");
      }, 2000);
    } else {
      const newProject: ProjectType = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        owner: profile!.id + "",
        collaborators: [
          { user_name: profile?.name!, user_id: profile?.id + "" },
        ],
      };
      const updateProjects = async () => {
        let newP: any;
        setProjectLoading(true);
        if (!isAiEnabled) {
          newP = await addNewProject(newProject);
        } else {
          newP = await addNewProjectWithTasks(newProject);
        }
        setProjectLoading(false);

        setProjects([...projects!, newP]);
        navigate(`/project/${newP.project_id}`);
      };
      updateProjects();
    }
  };

  return (
    <div className="standard-container">
      <div className="standard-container-title">
        <h1>New</h1>
      </div>
      <form className="newProject-form" onSubmit={createNewProject}>
        <h1 className="form-input-title">Project title</h1>
        <textarea
          name="title"
          ref={titleFieldRef}
          placeholder="Input project title"
          className="standard-container-input "
          maxLength={20}
        />
        {emptyTitle && (
          <label className="new-project-error">
            Title field can't be empty
          </label>
        )}
        <h1 className="form-input-title">Project description</h1>
        <textarea
          name="description"
          className="standard-container-input new-project-description"
          placeholder="Input project description"
        />
        <div className="selector-container">
          <label>Use AI to generate your first tasks</label>
          <input type="checkbox" onClick={() => setIsAiEnabled(!isAiEnabled)} />
        </div>
        <button
          className="standard-container-button left standard-container-button left medium"
          onClick={handleCancelNewProject}
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
      </form>
    </div>
  );
};
