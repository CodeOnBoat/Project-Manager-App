import React from "react";
import "./IconCard.css";

type IconCardType = {
  title: string;
  text: string;
  image: string;
  color: string;
};

export const IconCard = ({ title, text, image, color }: IconCardType) => {
  return (
      <div className="iconCard-container">
        <div
          className="iconCard-header"
          style={{ backgroundColor: color }}
        ></div>
        <div className="iconCard-text">
          <div
            className="iconCard-image"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
  );
};
