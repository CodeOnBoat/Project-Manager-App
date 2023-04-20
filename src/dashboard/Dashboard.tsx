import React from "react";
import { Profile } from "../App";
import "./Dashboard.css";

interface DashbordProps {
  profile: Profile;
  logOut: React.MouseEventHandler<HTMLButtonElement>;
}

function Dashboard(props: DashbordProps) {
  return (
    <div>
      <div className="user-info">
        <img src={props.profile.picture} alt="user image" sizes="60x60" />
        <h3>User Logged in</h3>
        <p>Name: {props.profile.name}</p>
        <p>Email Address: {props.profile.email}</p>
        <br />
        <br />
        <button onClick={props.logOut}>Log out</button>
      </div>
      <input type="text" />
      <button className="btn-submit-new-activity ">Add New Project</button>
    </div>
  );
}

export default Dashboard;
