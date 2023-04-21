import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import { googleLogin } from "../../client/client";
import Dashboard from "../dashboard/Dashboard";
import "./LandingPage.css";
import { Profile } from "../../data/Interfaces";

interface LandingPageProps {
  profile: Profile | undefined;
  setProfile: Function;
}

export const LandingPage = (props: LandingPageProps) => {
  const [user, setUser] = useState<TokenResponse>();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      const login = async () => {
        const data = await googleLogin(user);
        props.setProfile(data);
      };
      login();
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="app-container">
      <div className="login-container">
        <h1 className="app-title">Project Manager App</h1>
        <h2 className="app-title">Start less, finish more!</h2>
        <div className="login-bubble-container">
          <h2 className="login-container-title">
            Start managing your activities like a pro!
          </h2>
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>
      </div>
    </div>
  );
};
