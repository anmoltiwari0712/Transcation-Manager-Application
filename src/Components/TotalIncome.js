import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "../styles/TotalIncome.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TotalIncome = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(
      storedTransactions.filter((transaction) => transaction.type === "Income")
    );
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() + 1 === selectedMonth &&
      transactionDate.getFullYear() === selectedYear
    );
  });

  const pieData = {
    labels: Array.from(
      new Set(filteredTransactions.map((transaction) => transaction.category))
    ),
    datasets: [
      {
        data: filteredTransactions
          .reduce((acc, transaction) => {
            const index = acc.findIndex(
              (cat) => cat.label === transaction.category
            );
            if (index > -1) {
              acc[index].value += parseFloat(transaction.amount);
            } else {
              acc.push({
                label: transaction.category,
                value: parseFloat(transaction.amount),
              });
            }
            return acc;
          }, [])
          .map((cat) => cat.value),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF5733",
          "#33FF57",
          "#5733FF",
        ],
      },
    ],
  };

  const barData = {
    labels: Array.from(
      new Set(filteredTransactions.map((transaction) => transaction.category))
    ),
    datasets: [
      {
        label: "Income",
        data: filteredTransactions
          .reduce((acc, transaction) => {
            const index = acc.findIndex(
              (cat) => cat.label === transaction.category
            );
            if (index > -1) {
              acc[index].value += parseFloat(transaction.amount);
            } else {
              acc.push({
                label: transaction.category,
                value: parseFloat(transaction.amount),
              });
            }
            return acc;
          }, [])
          .map((cat) => cat.value),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  return (
    <div className="total-income-container">
      <div className="filters">
        <div className="filter">
          <label htmlFor="month">Month:</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            {[...Array(12).keys()].map((i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="year">Year:</label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            {[2020, 2021, 2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart pie-chart">
          <h3>Income by Category (Pie Chart)</h3>
          <Pie
            data={pieData}
            width={200}
            height={200}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
        <div className="chart bar-chart">
          <h3>Income by Category (Bar Graph)</h3>
          <Bar
            data={barData}
            width={200}
            height={200}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalIncome;
