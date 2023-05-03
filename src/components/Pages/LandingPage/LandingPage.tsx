import React, { useState, useEffect } from "react";
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

export const LandingPage = (props: LandingPageProps) => {
  const [user, setUser] = useState<TokenResponse>();
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
        props.setProfile(data);
      };
      login();
      navigate("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    props.logOut();
  }, []);

  return (
    <div className="landingPage-container">
      <div className="landingPage-login-container">
        <div>
          <img className="landing-logo-image" src={Logo} />
        </div>
        <button className="landingPage-google-button" onClick={() => login()}>
          <img className="landingPage-google-button-image" src={GoogleIcon} />
          <div>Start with Google</div>
        </button>
      </div>
    </div>
  );
};
