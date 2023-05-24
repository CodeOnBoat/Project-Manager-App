import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import { googleLogin } from "../../../client/client";
import Dashboard from "../Dashboard/Dashboard";
import "./LandingPage.css";
import { LandingPageProps, Profile } from "../../../data/Interfaces";
import GoogleIcon from "../../../data/images/Google-button.png";
import Img from "../../../data/images/landingImg.png";
import Logo from "../../../data/images/logo.png";
import { AppContext } from "../../../context/AppContext";
import { ContinueWithGoogle } from "../../Items/ContinueWithGoogle/ContinueWithGoogle";

export const LandingPage = ({ logOut }: LandingPageProps) => {
  const [user, setUser] = useState<TokenResponse>();
  const { darkMode, setDarkMode, profile, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      const login = async () => {
        const data = await googleLogin(user);
        setProfile(data);
      };
      login();
      navigate("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    logOut();
  }, []);

  return (
    <div className="landingPage-container">
      <div className="landingPage-login-container">
        <div>
          <h1>TASKWISE</h1>
          <p>The AI powered Kanban board</p>
        </div>
        <ContinueWithGoogle login={login} />
      </div>
    </div>
  );
};
