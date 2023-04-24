import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { ProjectType } from "../../../data/Interfaces";
import { addNewProject } from "../../../client/client";
import { useNavigate } from "react-router-dom";
import './NewProject.css';

export interface NewProjectProps {
  handleCancelNewProject: () => void;
}

export const NewProject = ({ handleCancelNewProject }: NewProjectProps) => {
  const { projects, profile, setProjects } = useContext(AppContext);
  const navigate = useNavigate();

  const createNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject: ProjectType = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      owner: profile!.id + "",
    };
    const updateProjects = async () => {
      const newP = await addNewProject(newProject);
      setProjects([...projects!, newP]);
      navigate(`/project/${newP.title}`);
    };
    updateProjects();
  };

  return (
    <div className="standard-container">
      <form className="newProject-form" onSubmit={createNewProject}>
        <h1 className="form-input-title">Project title</h1>
        <textarea
          name="title"
          placeholder="Input project title"
          className="new-project-input new-project-title"
        />
        <h1 className="form-input-title" style={{ marginTop: "50px" }}>Project description</h1>
        <textarea
          name="description"
          className="new-project-input new-project-description"
          placeholder="Input project description"
        />
        <button
          className="new-project-button cancel"
          onClick={handleCancelNewProject}
          type="button"
        >
          Cancel
        </button>
        <button
          className="new-project-button create"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};
