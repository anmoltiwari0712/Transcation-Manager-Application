import React, { useState, useEffect } from "react";
import "../styles/FilterTranscations.css";

const FilterTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
    setFilteredTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    let tempTransactions = [...transactions];

    if (type) {
      tempTransactions = tempTransactions.filter((t) => t.type === type);
    }
    if (currency) {
      tempTransactions = tempTransactions.filter(
        (t) => t.currency === currency
      );
    }
    if (category) {
      tempTransactions = tempTransactions.filter(
        (t) => t.category === category
      );
    }
    if (searchTerm) {
      tempTransactions = tempTransactions.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    tempTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredTransactions(tempTransactions);
  }, [type, currency, category, searchTerm, transactions]);

  return (
    <div className="filter-container">
      <h2 className="Filter-heading">Filter Transactions ✍🏻</h2>
      <div className="filters">
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
          <option value="">Select Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Rent">Rent</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="transaction-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <div key={index} className="transaction-card">
              <div className="card-header">
                <h3>{transaction.title}</h3>
                <div className="card-date">{transaction.date}</div>
              </div>
              <div className="card-body">
                <div className="card-amount">
                  {transaction.amount} {transaction.currency}
                </div>
                <div className="card-category">
                  Category: {transaction.category}
                </div>
                <div className="card-notes">Notes: {transaction.notes}</div>
                <div className="card-type">Type: {transaction.type}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default FilterTransactions;
