import React from "react";
import "../styles/RegularCard.css";
import { Link } from "react-router-dom";
const RegularCard = ({ title, body, icon, hoverText, link }) => {
  return (
    <Link to={link} className="card card-link">
      <div className="icon">{icon}</div>
      <strong>{title}</strong>
      <div className="card__body">{body}</div>
      <span>{hoverText}</span>
    </Link>
  );
};

export default RegularCard;
