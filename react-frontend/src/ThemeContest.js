
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://eyy5j3rnsi.execute-api.ap-southeast-2.amazonaws.com/getdata"
      );

      let data = [];
      if (response.data.body) {
        // Lambda returns stringified JSON in body
        data = JSON.parse(response.data.body);
      } else {
        data = response.data;
      }

      setTransactions(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions(); // fetch when component mounts
  }, []);

  // Update a transaction locally
  const updateTransaction = (txnId, updates) => {
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.Transactions === txnId ? { ...txn, ...updates } : txn
      )
    );
  };

  // Dark mode effect
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // Fetch transactions once on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        setDark,
        transactions,
        loading,
        error,
        fetchTransactions,
        updateTransaction,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

