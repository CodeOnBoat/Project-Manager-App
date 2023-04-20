import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import "./App.css";
import { Profile } from "./data/Interfaces";
import Dashboard from "./components/dashboard/Dashboard";
import { googleLogin, postUser } from "./client/client";
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
        element={<Dashboard profile={profile!} logOut={logOut} />}
      />
      <Route path="/project" element={<Project />} />
    </Routes>
  );
}
export default App;
