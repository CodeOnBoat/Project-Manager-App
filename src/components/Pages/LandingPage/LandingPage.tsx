import { useState, useEffect, useContext } from "react";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import { googleLogin } from "../../../client/client";
import "./LandingPage.css";
import { LandingPageProps } from "../../../data/Interfaces";
import { AppContext } from "../../../context/AppContext";
import { ContinueWithGoogle } from "../../Items/ContinueWithGoogle/ContinueWithGoogle";
import LightCube from "../../../data/images/lightCube.png";
import darkCube from "../../../data/images/darkCube.png";

export const LandingPage = ({ logOut }: LandingPageProps) => {
  const [user, setUser] = useState<TokenResponse>();
  const { setProfile, darkMode } = useContext(AppContext);
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
        <img src={darkMode === "dark" ? darkCube : LightCube} className="landing-page-logo"/>
        <ContinueWithGoogle login={login} />
      </div>
    </div>
  );
};
