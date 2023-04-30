import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { ProjectType } from "../../../data/Interfaces";
import { addNewProject } from "../../../client/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NewProject.css";
import { useRef } from "react";
import Spinner from "../Spinner/Spinner";

export interface NewProjectProps {
  handleCancelNewProject: () => void;
}

export const NewProject = ({ handleCancelNewProject }: NewProjectProps) => {
  const { projects, profile, setProjects } = useContext(AppContext);
  const navigate = useNavigate();
  const [emptyTitle, setEmptyTitle] = useState(false);
  const titleFieldRef = useRef<HTMLTextAreaElement>(null);
  const [projectLoading, setProjectLoading] = useState(false);

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
        setProjectLoading(true);
        const newP = await addNewProject(newProject);
        setProjectLoading(false);
        setProjects([...projects!, newP]);
        navigate(`/project/${newP.title}`);
      };
      updateProjects();
    }
  };

  return (
    <div className="standard-container">
      <div className="standard-container-title">
        <h1>New project</h1>
      </div>
      <form className="newProject-form" onSubmit={createNewProject}>
        <h1 className="form-input-title">Project title</h1>
        <textarea
          name="title"
          ref={titleFieldRef}
          placeholder="Input project title"
          className="new-project-input "
        />
        {emptyTitle && (
          <label className="new-project-error">
            Title field can't be empty
          </label>
        )}
        <h1 className="form-input-title" style={{ marginTop: "50px" }}>
          Project description
        </h1>
        <textarea
          name="description"
          className="new-project-input new-project-description"
          placeholder="Input project description"
        />
        {/* <label className="new-project-error">
          Description field can't be empty
        </label> */}
        {projectLoading && <Spinner />}
        <button
          className="standard-container-button left"
          onClick={handleCancelNewProject}
          type="button"
        >
          Cancel
        </button>
        <button
          className="standard-container-button right"
          type="submit"
          disabled={projectLoading}
        >
          Create
        </button>
      </form>
    </div>
  );
};
