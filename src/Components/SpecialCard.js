import React from "react";
import { Link } from "react-router-dom";
import "../styles/SpecialCard.css";

const SpecialCard = ({ title, body, link }) => {
  return (
    <Link to={link} className="card-link">
      <div className="card1">
        <p>{title}</p>
        <p className="small">{body}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </div>
    </Link>
  );
};

export default SpecialCard;
