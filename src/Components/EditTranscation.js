import React, { useState, useEffect } from "react";
import "../styles/EditTranscation.css";

const EditTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    amount: "",
    category: "",
    title: "",
    notes: "",
    type: "",
    currency: "",
  });
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

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setEditFormData(transaction);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTypeChange = (type) => {
    setEditFormData((prevData) => ({ ...prevData, type }));
  };

  const handleSave = () => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.title === selectedTransaction.title
        ? editFormData
        : transaction
    );
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setSelectedTransaction(null);
  };

  const handleCancel = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="edit-transaction-container">
      <h2 className="Edit-heading">Edit Transactions 📝</h2>

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
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="SEK">SEK</option>
          <option value="NZD">NZD</option>
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
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className="transaction-card">
            <div className="card-header">
              <h3>{transaction.title}</h3>
              <div
                className="edit-icon"
                onClick={() => handleEditClick(transaction)}
              >
                Edit
              </div>
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
        ))}
      </div>

      {selectedTransaction && (
        <div className="dialog-container">
          <div className="dialog-box">
            <div className="close-icon" onClick={handleCancel}>
              &times;
            </div>
            <h2>Edit Transaction</h2>
            <div className="toggle-container">
              <button
                className={`toggle-button ${
                  editFormData.type === "Income" ? "active" : ""
                }`}
                onClick={() => handleEditTypeChange("Income")}
              >
                Income
              </button>
              <button
                className={`toggle-button ${
                  editFormData.type === "Expense" ? "active" : ""
                }`}
                onClick={() => handleEditTypeChange("Expense")}
              >
                Expense
              </button>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="edit-date">Date</label>
                <input
                  type="date"
                  id="edit-date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-amount">Amount</label>
                <input
                  type="number"
                  id="edit-amount"
                  name="amount"
                  value={editFormData.amount}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-currency">Currency</label>
                <select
                  id="edit-currency"
                  name="currency"
                  value={editFormData.currency}
                  onChange={handleEditInputChange}
                  required
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="JPY">JPY</option>
                  <option value="AUD">AUD</option>
                  <option value="CAD">CAD</option>
                  <option value="CHF">CHF</option>
                  <option value="CNY">CNY</option>
                  <option value="SEK">SEK</option>
                  <option value="NZD">NZD</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <select
                  id="edit-category"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditInputChange}
                  required
                >
                  <option value="">Select a category</option>
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
              </div>
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-notes">Notes</label>
                <textarea
                  id="edit-notes"
                  name="notes"
                  value={editFormData.notes}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTransaction;
