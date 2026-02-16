import { useContext, useState, useMemo } from "react";
import { ThemeContext } from "./ThemeContest";
import { LineChart,PieChart } from "./charts/Bar";
import RecentTransactions from "./Recent";
import Dashboard2 from "@mui/icons-material/Dashboard";
import Graph from "@mui/icons-material/MonitorHeartOutlined";
import Up from "@mui/icons-material/TrendingUp";
import Spam from "@mui/icons-material/ReportOutlined";
import Money from "@mui/icons-material/AttachMoney";
import Security from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import Analysis from "@mui/icons-material/DonutLargeOutlined";
import Shop from "@mui/icons-material/LocalMall";
import Light from "@mui/icons-material/LightModeSharp";
import Dark from "@mui/icons-material/DarkMode";

export default function FraudDashboard() {
  const { dark, setDark, transactions } = useContext(ThemeContext);
  const nav = useNavigate();
  const [active, setActive] = useState("All");

  // Compute metrics dynamically
  const metrics = useMemo(() => {
    const total = transactions.length;
    const fraud = transactions.filter((t) => t.Fraud === 1).length;
    const flagged = transactions.filter((t) => t.TransactionStatus === "Flagged").length;
    const amount = transactions.reduce((sum, t) => sum + t.Amount, 0);
    return { total, fraud, flagged, amount };
  }, [transactions]);

  // Prepare Payment Methods data for chart
  const paymentData = useMemo(() => {
    const counts = transactions.reduce((acc, t) => {
      acc[t.PaymentMethod] = (acc[t.PaymentMethod] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([method, count]) => ({ method, count }));
  }, [transactions]);

  return (
    <div className="flex flex-row bg-zinc-100 h-full text-gray-700 dark:bg-gray-950 dark:text-gray-100">

      {/* Sidebar */}
      <div className="flex flex-col gap-5 p-3 pl-3 pt-5 mr-8 bg-gray-200 text-black dark:bg-gray-800 dark:text-gray-300 pr-2">
        <div className="border-1 h-10 pt-1.5 p-2 rounded-xl text-gray-100 bg-blue-500 dark:text-gray-100">
          <Security />
        </div>
        <div className="border-1 h-10 p-2 rounded-lg pb-3 text-gray-700 dark:text-gray-100 bg-gray-400 dark:bg-gray-500" onClick={() => nav("/")} title="Dashboard">
          <Dashboard2 />
        </div>
       
        <div className="border-1 h-10 p-2 rounded-lg pb-3 text-gray-700 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500" onClick={() => nav("/shop")} title="Shop">
          <Shop />
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="mt-3 min-h-screen min-w-full">
        <div className="w-10/12 lg:w-11/12 flex flex-row gap-2 mt-3 mr-10 border-b-4 dark:border-b-2 dark:border-zinc-300 border-zinc-200 pb-3">
          <div className="border-1 p-1 rounded-lg text-white bg-green-400">
            <Dashboard2 />
          </div>
          <h3 className="text-2xl font-bold">Dashboard</h3>

          <div className="absolute right-10 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
            <button onClick={() => setDark(!dark)} className="px-4 py-2 text-yellow-400 dark:text-yellow-300">
              {dark ? <Light /> : <Dark />}
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="w-10/12 lg:w-11/12 grid grid-cols-2 lg:grid-cols-4 gap-5 mt-3 p-1 pr-4">
          {/* Total Transactions */}
          <div className="relative flex flex-row gap-3 border-1 pl-5 pt-3 rounded-lg pb-3 bg-green-400/25 text-black dark:text-gray-300">
            <div>
              <h3 className="text-md">Total Transactions</h3>
              <p className="text-5xl">{metrics.total}</p>
              <div><span className="text-green-500"><Up /> +12%</span> vs last hour</div>
            </div>
            <div className="absolute right-5 border-1 p-1 rounded-lg text-gray-100 bg-green-400 dark:text-white">
              <Graph />
            </div>
          </div>

          {/* Fraud */}
          <div className="relative flex flex-row gap-3 border-1 pl-5 pt-3 rounded-lg pb-3 bg-red-500/25 text-black dark:text-gray-300">
            <div>
              <h3 className="text-md">Fraud</h3>
              <p className="text-5xl">{metrics.fraud}</p>
              <div><span className="text-red-500"><Up /> +12%</span> vs last hour</div>
            </div>
            <div className="absolute right-5 border-1 p-1 rounded-lg text-gray-100 bg-red-500 dark:text-white">
              <Spam />
            </div>
          </div>

          

          {/* Transaction Amount */}
          <div className="relative flex flex-row gap-3 border-1 pl-5 pt-3 rounded-lg pb-3 bg-orange-500/50 text-black dark:bg-orange-600/40 dark:text-gray-300">
            <div>
              <h3 className="text-md">Transaction Amount</h3>
              <p className="text-3xl mt-2 mb-2 ">$ {metrics.amount.toFixed(2)}</p>
              <div><span className="dark:text-orange-300 text-orange-800"><Up /> +12%</span> vs last hour</div>
            </div>
            <div className="absolute right-5 border-1 p-1 rounded-lg text-gray-100 bg-orange-500 dark:text-white">
              <Money />
            </div>
          </div>
        </div>

        {/* Charts & Recent Transactions */}
        <div className="w-10/12 lg:w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3 p-1 pr-4">
          {/* Payment Methods Chart */}
          <div className="border-1 pl-5 pt-3 rounded-lg pb-3 bg-zinc-200 text-black dark:bg-gray-800 dark:text-gray-300">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <div>
              <LineChart data={paymentData} />
            </div>
          </div>
          <div className="border-1 pl-5 pt-3  rounded-lg  pb-3  bg-zinc-200 text-black dark:bg-gray-800 dark:text-gray-300 ">
            <h3 className="text-lg font-semibold">Product Category</h3>
            <div><PieChart/></div>
          </div>

          {/* Recent Transactions */}
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}
