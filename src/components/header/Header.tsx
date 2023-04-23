import React, { useContext, useState } from "react";
import "./Header.css";
import { AppContext } from "../../context/AppContext";
import Menu from "../../data/images/Menu.png";
import LogOut from "../../data/images/LogOut.png";
import Moon from "../../data/images/Moon.png";

interface HeaderProps {
  logOut: () => void;
}

export const Header = ({ logOut }: HeaderProps) => {
  const { profile } = useContext(AppContext);
  const [showCirclesContainer, setShowCirclesContainer] = useState(false);

  const handleCirclesContainerClick = () => {
    setShowCirclesContainer(!showCirclesContainer);
  };

  return (
    <>
      {profile && (
        <div className="header-container">
          <div
            className="animation-container"
            style={{ width: showCirclesContainer ? "400px" : "260px" }}
          >
            <div
              className="user-name-container"
              onClick={() => {
                handleCirclesContainerClick();
              }}
            >
              <p className="user-name">{profile?.name}</p>
              <img src={Menu} width="15%" />
            </div>
            {showCirclesContainer && (
              <div className="circles-container">
                <div className="circle-hearder">
                  <img className="moon-img" src={Moon} />
                </div>
                <div className="circle-hearder" onClick={logOut}>
                  <img className="logOut-img" src={LogOut} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
