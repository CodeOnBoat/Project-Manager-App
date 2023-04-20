import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import { log } from "console";
import { Url } from "url";

export interface Profile {
  email: string;
  family_name: string;
  given_name: string;
  id: number;
  name: string;
  picture: string;
  verified_email: boolean;
}

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
      <h1 className="app-title">Project Manager App</h1>
      <h2 className="app-title">Start less, finish more!</h2>

      {profile ? (
        <Dashboard profile={profile} logOut={logOut} />
      ) : (
        <div className="login-container">
          <h2 className="login-container-title">
            Start managing your activities like a pro!
          </h2>
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>
      )}
    </div>
  );
}
export default App;
