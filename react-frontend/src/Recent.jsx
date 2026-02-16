/*import { useState } from "react";

export default function RecentTransactions() {
  const tabs = ["All", "Approved", "Flagged", "Blocked"];
  const [active, setActive] = useState("All");

  const transactions = [
    {
      amount: "$3,250.00",
      method: "credit card",
      merchant: "Delta Airlines",
      card: "8877",
      country: "CA",
      risk: 62,
      status: "Flagged",
      time: "15:55:42",
    },
    {
      amount: "$2,499.99",
      method: "credit card",
      merchant: "TechWorld Electronics",
      card: "4521",
      country: "US",
      risk: 25,
      status: "Approved",
      time: "15:55:42",
    },
    {
      amount: "$199.99",
      method: "paypal",
      merchant: "Amazon Prime",
      card: "6543",
      country: "US",
      risk: 12,
      status: "Approved",
      time: "15:55:42",
    },
  ];

  const filteredTransactions =
    active === "All"
      ? transactions
      : transactions.filter((t) => t.status === active);

  return (
    <div className="bg-zinc-200 dark:bg-gray-800 rounded-lg">

     
      <div className="h-20 pt-7 flex flex-row gap-2 relative pl-5 pb-3 text-black dark:text-gray-300">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>

        <div className="absolute right-10 top-5 bg-gray-500/50 p-2 rounded-lg">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActive(tab)}
                className={`
                  cursor-pointer px-3 py-1 rounded transition
                  ${
                    active === tab
                      ? "bg-gray-300 dark:bg-gray-400 text-black"
                      : "bg-transparent text-gray-600 dark:text-gray-300"
                  }
                `}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="px-5 pb-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No transactions found
          </p>
        ) : (
          filteredTransactions.map((tx, index) => (
            <div
              key={index}
              className="grid grid-cols-3  gap-5 items-center py-3 border-2 mb-2 pl-5 rounded-lg dark:border-zinc-700"
            >
                <div className="flex flex-col ">
                    <div className="flex flex-row gap-2">
                         <div className="font-semibold">{tx.amount}</div>
                        <div className="text-sm text-zinc-500 border rounded-lg border-gray-500">{tx.method}</div>
                    </div>
                   
                    <div className="col-span-2">{tx.merchant}</div>
                </div>
               
             
             
              <div
                className={`font-medium ${
                  tx.risk > 60 ? "text-red-500" : "text-green-500"
                }`}
              >
                {tx.risk}
              </div>

             
              <div
                className={`text-sm px-2 py-1 rounded w-fit ${
                  tx.status === "Approved"
                    ? "bg-green-500/20 text-green-600"
                    : tx.status === "Flagged"
                    ? "bg-amber-500/20 text-amber-600"
                    : "bg-red-500/20 text-red-600"
                }`}
              >
                {tx.status}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
*/import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContest";

export default function RecentTransactions() {
  const tabs = ["All", "Approved", "Flagged"];
  const [active, setActive] = useState("All");
  const { transactions } = useContext(ThemeContext); // actual transaction data

  const filteredTransactions =
    active === "All"
      ? transactions
      : transactions.filter((t) => t.TransactionStatus === active);

  return (
    <div className="bg-zinc-200 dark:bg-gray-800 rounded-lg">

      {/* Header + Tabs */}
      <div className="h-20 pt-7 flex flex-row gap-2 relative pl-5 pb-3 text-black dark:text-gray-300">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>

        <div className="absolute right-10 top-5 bg-gray-500/50 p-2 rounded-lg">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActive(tab)}
                className={`
                  cursor-pointer px-3 py-1 rounded transition
                  ${
                    active === tab
                      ? "bg-gray-300 dark:bg-gray-400 text-black"
                      : "bg-transparent text-gray-600 dark:text-gray-300"
                  }
                `}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-3 gap-5 px-5 pb-2 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-400 dark:border-gray-600">
        <div></div>
        <div>Fraud / Risk</div>
        <div>Status</div>
      </div>

      {/* Transactions List */}
      <div className="px-5 pb-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No transactions found
          </p>
        ) : (
          filteredTransactions.map((tx, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-5 items-center py-3 border-2 mb-2 pl-5 rounded-lg dark:border-zinc-700"
            >
              {/* Amount + Method + User */}
              <div className="flex flex-col">
                <div className="flex flex-row gap-2">
                  <div className="font-semibold">${tx.Amount}</div>
                  <div className="text-sm text-zinc-500 pl-2 pr-2 border rounded-lg border-gray-500">{tx.PaymentMethod}</div>
                </div>
                <div className="col-span-2">{tx.UserId || tx.Merchant}</div>
              </div>

              {/* Fraud / Risk */}
              <div
                className={`font-medium ${
                  tx.Fraud ? "text-orange-500" : "text-green-500"
                }`}
              >
                {tx?.ProductCategory ? tx.ProductCategory :"-"}
              </div>

              {/* Status */}
              <div
                className={`text-sm px-2 py-1 rounded w-fit ${
                  tx.TransactionStatus === "Approved"
                    ? "bg-green-500/20 text-green-600"
                    :  "bg-amber-500/20 text-amber-600"
                    
                }`}
              >
                {tx.TransactionStatus}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
