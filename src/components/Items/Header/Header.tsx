import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import { AppContext } from "../../../context/AppContext";
import Menu from "../../../data/images/Menu.png";
import LogOut from "../../../data/images/LogOut.png";
import Moon from "../../../data/images/Moon.png";
import Logo from "../../../data/images/logo.png";
import NotificationOff from "../../../data/images/notificationOff.png";
import { getNotifications, resolveNotification } from "../../../client/client";
import { NotificationType } from "../../../data/Interfaces";

interface HeaderProps {
  logOut: () => void;
}

export const Header = ({ logOut }: HeaderProps) => {
  const { profile, notifications, setNotifications } = useContext(AppContext);
  const [showCirclesContainer, setShowCirclesContainer] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const animationContainerRef = useRef<HTMLDivElement>(null);
  const handleNotification = () => {
    setShowNotification(!showNotification);
  };
  const handleCirclesContainerClick = () => {
    setShowCirclesContainer(!showCirclesContainer);
    setShowNotification(false);
  };

  useEffect(() => {
    const getNot = async () => {
      const notificationsReq = await getNotifications(profile!.id + "");
      setNotifications(notificationsReq);
      console.log(notifications);
    };
    if (profile) getNot();
  }, [profile]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  const handleNotificationResolve = (
    notification: NotificationType,
    action: string,
    user_name: string
  ) => {
    resolveNotification(
      notification.project_id,
      profile!.id + "",
      action,
      user_name
    );
    let tempNotifications = [...notifications];
    tempNotifications = tempNotifications.filter(
      (n) => n.user_id != notification.user_id
    );
    setNotifications(tempNotifications);
  };

  return (
    <>
      {profile && (
        <div className="header-container">
          <img className="header-logo-image" src={Logo} />
          <div className="header-right-container">
            <div ref={animationContainerRef} className="animation-container">
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
                <div className="circles-notification-container">
                  <div className="circles-container">
                    <div className="notification-panel">
                      <div
                        className="circle-header"
                        onClick={handleNotification}
                      >
                        <img src={NotificationOff} alt="" />
                      </div>
                    </div>
                    <div className="circle-header">
                      <img className="moon-img" src={Moon} />
                    </div>
                    <div className="circle-header" onClick={logOut}>
                      <img className="logOut-img" src={LogOut} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {showNotification && (
              <div className="notification-container">
                {notifications.length === 0 ? (
                  <div>No notification</div>
                ) : (
                  notifications.map((n, index) => (
                    <div className="standard-container notification-standard-container">
                      <div key={index}>
                        <div className="standard-container-title">
                          <h1> {n.projectName}</h1>
                        </div>
                        <div className="notification-message-container">
                          You have been invited to join this project by
                          {n.user_username}
                        </div>
                        <button
                          onClick={() =>
                            handleNotificationResolve(n, "accept", profile.name)
                          }
                          className="standard-container-button right"
                        >
                          accept
                        </button>
                        <button
                          className=" standard-container-button left red"
                          onClick={() =>
                            handleNotificationResolve(n, "reject", profile.name)
                          }
                        >
                          decline
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
