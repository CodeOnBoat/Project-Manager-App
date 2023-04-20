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

function App() {
  const [user, setUser] = useState<TokenResponse>();
  const [profile, setProfile] = useState<Profile | undefined>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(undefined);
  };

  return (
    <div className="app-container">
      {profile ? (
        <Dashboard profile={profile} logOut={logOut} />
      ) : (
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
      )}
    </div>
  );
}
export default App;
