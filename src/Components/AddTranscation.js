import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddTranscation.css";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    currency: "USD",
    category: "",
    title: "",
    notes: "",
    type: "Expense",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setFormData((prevData) => ({ ...prevData, type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    const updatedTransactions = [...existingTransactions, formData];

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    setFormData({
      date: "",
      amount: "",
      currency: "USD",
      category: "",
      title: "",
      notes: "",
      type: "Expense",
    });

    alert("Transaction saved successfully!");
    navigate("/");
  };

  const handleCancel = () => {
    setFormData({
      date: "",
      amount: "",
      currency: "USD",
      category: "",
      title: "",
      notes: "",
      type: "Expense",
    });
    navigate("/");
  };

  return (
    <div className="dialog-container">
      <div className="dialog-box">
        <h2>Add Transaction</h2>
        <div className="toggle-container">
          <button
            className={`toggle-button ${
              formData.type === "Income" ? "active" : ""
            }`}
            onClick={() => handleTypeChange("Income")}
          >
            Income
          </button>
          <button
            className={`toggle-button ${
              formData.type === "Expense" ? "active" : ""
            }`}
            onClick={() => handleTypeChange("Expense")}
          >
            Expense
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
