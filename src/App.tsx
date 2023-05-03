import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import "./App.css";
import { Profile, ProjectType } from "./data/Interfaces";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Project } from "./components/Pages/Project/Project";
import { LandingPage } from "./components/Pages/LandingPage/LandingPage";
import { AppContext } from "./context/AppContext";
import { Header } from "./components/Items/Header/Header";
import {
  ProjectContext,
  ProjectContextProvider,
} from "./context/ProjectContext";

function App() {
  const navigate = useNavigate();
  const { setProfile, profile, projects, setProjects } = useContext(AppContext);
  
  const logOut = () => {
    googleLogout();
    setProfile(undefined);
    setProjects(undefined);
    navigate("/");
  };

  return (
    <>
      <Header logOut={logOut} />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              logOut={logOut}
              profile={profile}
              setProfile={setProfile}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard logOut={logOut} />} />
        {projects &&
          projects &&
          projects.map((p, index) => (
            <Route
              path={`/project/${p.title}`}
              key={index}
              element={
                <>
                  <ProjectContextProvider>
                    <Project project={p} />
                  </ProjectContextProvider>
                </>
              }
            />
          ))}
      </Routes>
    </>
  );
}
export default App;
