import React, { useContext } from "react";
import "./Gear.css";
import aiLogo from "../../../data/images/aiLogo.png";
import { AppContext } from "../../../context/AppContext";

export const Gear = () => {
  const { darkMode } = useContext(AppContext);
  return (
    <div className="loading-contanier">
      <div className="container">
        <div className="h1Container">
          <div className="cube h1 w1 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w1 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w1 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w2 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w2 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w2 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w3 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w3 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h1 w3 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>
        </div>

        <div className="h2Container">
          <div className="cube h2 w1 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w1 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w1 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w2 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w2 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w2 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w3 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w3 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h2 w3 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>
        </div>

        <div className="h3Container">
          <div className="cube h3 w1 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w1 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w1 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w2 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w2 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w2 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w3 l1">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w3 l2">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>

          <div className="cube h3 w3 l3">
            <div className={`face top ${darkMode}`}></div>
            <div className="face left1"></div>
            <div className="face right1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
