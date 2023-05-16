import React from "react";
import { IconCard } from "../IconCard/IconCard";
import "./IconCardCarousel.css";

type Card = {
  title: string;
  text: string;
  image: string;
  color: string;
};

type IconCardCarouselType = {
  cards: Card[];
};

export const IconCardCarousel = ({ cards }: IconCardCarouselType) => {
  return (
    <>
      <div className="carousel-container">
        <div className="cards-container">
          {cards.map((card) => (
            <IconCard {...card} />
          ))}
        </div>
      </div>
    </>
  );
};
