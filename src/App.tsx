import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import "./App.css";
import { Profile, ProjectType } from "./data/Interfaces";
import Dashboard from "./components/dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Project } from "./components/project/Project";
import { LandingPage } from "./components/landingPage/LandingPage";

function App() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | undefined>();
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const logOut = () => {
    googleLogout();
    setProfile(undefined);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage profile={profile} setProfile={setProfile} />}
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            profile={profile!}
            logOut={logOut}
            projects={projects}
            setProjects={setProjects}
          />
        }
      />
      {projects.map((p, index) => (
        <Route
          path={`/project/${p.title}`}
          key={index}
          element={<Project project={p} />}
        />
      ))}
    </Routes>
  );
}
export default App;
