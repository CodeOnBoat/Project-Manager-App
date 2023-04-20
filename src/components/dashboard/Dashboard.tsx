import React, { useState } from "react";
import "./Dashboard.css";
import { DashbordProps, Profile } from "../../data/Interfaces";

function Dashboard(props: DashbordProps) {
  const [projects, setNewProject] = useState<string[]>([]);

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <img src={props.profile.picture} alt="user image" sizes="60x60" />
        <p>{props.profile.given_name}</p>
        <button onClick={props.logOut}>Log out</button>
      </div>
      <div className="input-form-container">
        <button className="btn-submit-new-activity ">Add New Project</button>
        <input
          className="project-title"
          placeholder="Project title"
          type="text"
        />
        <input
          className="project-description"
          placeholder="Project description"
          type="text"
        />
      </div>
      <div className="input-form-container">
        <h1>project title</h1>
        <p>project description</p>
        <p>esitimated hours to complete</p>
        <p>hours worked</p>
        <p>task completed</p>
        <p>task to be done</p>
        <p>project starting date</p>
      </div>
    </div>
  );
}

export default Dashboard;
