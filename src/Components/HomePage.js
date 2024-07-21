import React from "react";
import SpecialCard from "./SpecialCard";
import RegularCard from "./RegularCard";
import "../styles/HomePage.css";
import Add from "../assets/add.png";
import Edit from "../assets/edit.png";
import Remove from "../assets/remove.png";
import View from "../assets/view.png";

const HomePage = () => {
  const userName = "User Name";
  return (
    <div className="container">
      <div className="cards-row">
        <SpecialCard
          title="Total Income 📈"
          body="Take control of your Income with our Total Income page!"
          link="/Total-Income"
        />
        <SpecialCard
          title="Total Expense 📊"
          body="Take control of your spending with our Total Expense page!"
          link="/Total-Expense"
        />
      </div>
      <div className="cards-row">
        <RegularCard
          title="Add Transaction"
          body=""
          icon={<img src={Add} alt="Icon" className="card-icon" />}
          hoverText="Add Transaction"
          link="/add-transaction"
        />
        <RegularCard
          title="Edit Transaction"
          body=""
          icon={<img src={Edit} alt="Icon" className="card-icon" />}
          hoverText="Edit Transaction"
          link="/edit-transaction"
        />
        <RegularCard
          title="Remove Transaction"
          body=""
          icon={<img src={Remove} alt="Icon" className="card-icon" />}
          hoverText="Remove Transaction"
          link="/remove-transaction"
        />
        <RegularCard
          title="View Transactions"
          body=""
          icon={<img src={View} alt="Icon" className="card-icon" />}
          hoverText="View Transactions"
          link="/filter-transactions"
        />
      </div>
    </div>
  );
};

export default HomePage;
