import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AddTransaction from "./Components/AddTranscation";
import EditTransaction from "./Components/EditTranscation";
import RemoveTransaction from "./Components/RemoveTranscation";
import FilterTransactions from "./Components/FilterTranscation";
import VisualizeData from "./Components/VisualizeData";
import TotalIncome from "./Components/TotalIncome";
import TotalExpense from "./Components/TotalExpense";
import { useTheme } from "./ThemeContext";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1 className="Heading-1">Welcome back, Anmol 👋🏻</h1>
          <div onClick={toggleDarkMode} className="dark-mode-toggle">
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              className={darkMode ? "icon-sun" : "icon-moon"}
            />
          </div>
        </header>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/edit-transaction" element={<EditTransaction />} />
            <Route path="/remove-transaction" element={<RemoveTransaction />} />
            <Route
              path="/filter-transactions"
              element={<FilterTransactions />}
            />
            <Route path="/visualize-data" element={<VisualizeData />} />
            <Route path="/Total-Income" element={<TotalIncome />} />
            <Route path="/Total-Expense" element={<TotalExpense />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
