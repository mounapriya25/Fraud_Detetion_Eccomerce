/*import { Bar,Doughnut,Line,Radar,PolarArea,Bubble,Pie} from "react-chartjs-2";
import "../chartsetup";

export  function BarChart() {
  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Risk Levels",
        data: [120, 45, 25],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#e5e7eb" } },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" } },
      y: { ticks: { color: "#9ca3af" } },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
export  function PieChart(){
  const data={
    labels:["low","med","high"],
    datasets:[{
      label:"Risk",
      data:[10,50,20],
      backgroundColor:["#22c55e", "#f59e0b", "#ef4444"]
    }]
  }
  const options={
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{labels:{ color: "#e5e7eb" }}
    },
    scales:{
      x:{ticks:{color: "#9ca3af"}},
      y:{ticks:{color: "#9ca3af"}},
    }
  }
  return(
    <div style={{ height: "300px" }}>
    <Doughnut data={data} options={options}/>
    </div>
  )
}

export function LineChart() {
  return (
    <div style={{ height: 300 }}>
      <Line
        data={{
           labels: ["Credit Card", "PayPal", "Debit Card"],
          datasets: [
            {
              label: "Fraud Rate",
              data: [3, 9, 5],
              borderColor: "#ef4444",
               backgroundColor: "orange",
              tension: 0.4,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}

export function CategoryChart() {
  const data = {
    labels: ["Electronics", "Travel", "Fashion", "Groceries", "Dining"],
    datasets: [{
      data: [3, 1, 1, 1, 1],
      backgroundColor: "#f59e0b",
    }],
  };

  return <Bar data={data} options={{ indexAxis: "y" }} />;
}


export function FraudTrendChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "Fraud Count",
      data: [1, 2, 1, 3, 2],
      borderColor: "#22c55e",
      backgroundColor: "blue",
      fill: true,
    }],
  };

  return <Line data={data} />;
}

export function CountryBubbleChart() {
  const data = {
    datasets: [
      { label: "US", data: [{ x: 5, y: 5, r: 20 }], backgroundColor: "#3b82f6" },
      { label: "CA", data: [{ x: 3, y: 4, r: 10 }], backgroundColor: "#22c55e" },
      { label: "RO", data: [{ x: 2, y: 3, r: 10 }], backgroundColor: "#f59e0b" },
      { label: "UK", data: [{ x: 4, y: 3, r: 10 }], backgroundColor: "#a855f7" },
      { label: "NG", data: [{ x: 1, y: 2, r: 10 }], backgroundColor: "#ef4444" },
    ],
  };

  return <Bubble data={data} />;
}



export function PaymentMethodChart() {
  const data = {
    labels: ["Credit Card", "PayPal", "Debit Card"],
    datasets: [{
      data: [4, 2, 1],
      backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b"],
    }],
  };

  return <Bar data={data} />;
}
export function AnomaliesChart() {
  const data = {
    labels: [
      "High Amount",
      "Geo Mismatch",
      "New Device",
      "Odd Hours",
      "New Merchant",
      "Velocity Spike",
    ],
    datasets: [
      {
        data: [3, 2, 2, 1,6],
        backgroundColor: [
         "#22c55e", "#f59e0b","#3b82f6" ,"#a855f7","#ef4444"  
          
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // looks better for many labels
        labels: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px"  }} className="flex items-center justify-center h-screen">
      <Pie data={data} options={options} />
    </div>
  );
}*/import { useContext ,useMemo} from "react";
import { Bar, Doughnut, Line, Pie, Bubble } from "react-chartjs-2";
import "../chartsetup";
import { ThemeContext } from "../ThemeContest";

function useChartTheme() {
  const { dark ,transactions} = useContext(ThemeContext);

  return {
    text: dark ? "#e5e7eb" : "#374151",
    grid: dark ? "#3f3f46" : "#e5e7eb",
  };
}

/* ---------- BAR ---------- */
export function BarChart() {
  const theme = useChartTheme();

  return (
    <div style={{ height: 300 }}>
      <Bar
        data={{
          labels: ["Low", "Medium", "High"],
          datasets: [{
            label: "Risk Levels",
            data: [120, 45, 25],
            backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
          }],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: theme.text } },
          },
          scales: {
            x: { ticks: { color: theme.text }, grid: { color: theme.grid } },
            y: { ticks: { color: theme.text }, grid: { color: theme.grid } },
          },
        }}
      />
    </div>
  );
}
export function PieChart() {
  const { transactions } = useContext(ThemeContext);
 const theme = useChartTheme();
  // Count transactions per category
  const { labels, data } = useMemo(() => {
    const counts = transactions.reduce((acc, t) => {
      acc[t.ProductCategory] = (acc[t.ProductCategory] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      data: Object.values(counts),
    };
  }, [transactions]);

  // Generate dynamic colors for categories
  const colors = ["#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899"];
  const backgroundColor = labels.map((_, i) => colors[i % colors.length]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Transactions by Category",
        data,
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend:{labels: { color: theme.text }},
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed} transactions`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

/* ---------- LINE ---------- */
export function FraudTrendChart() {
  const theme = useChartTheme();

  return (
    <div style={{ height: 300 }}>
      <Line
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [{
            label: "Fraud Count",
            data: [1, 2, 1, 3, 2],
            borderColor: "#3b82f6",
            backgroundColor: "orange",
            fill: true,
          }],
        }}
        options={{
          scales: {
            x: { ticks: { color: theme.text }, grid: { color: theme.grid } },
            y: { ticks: { color: theme.text }, grid: { color: theme.grid } },
          },
          plugins: {
            legend: { labels: { color: theme.text } },
          },
        }}
      />
    </div>
  );
}
export function CategoryChart() {
   const theme = useChartTheme();
  const data = {
    labels: ["Electronics", "Travel", "Fashion", "Groceries", "Dining"],
    datasets: [{
      data: [3, 1, 1, 1, 1],
      backgroundColor: "#f59e0b",
    }],
  };
   
  return <Bar data={data} options={{indexAxis: "y"}} />;
}


/* ---------- PIE (ANOMALIES) ---------- */
export function AnomaliesChart() {
  const theme = useChartTheme();

  return (
    <div style={{ height: 400 }} className="flex justify-center">
      <Pie
        data={{
          labels: [
            "High Amount",
            "Geo Mismatch",
            "New Device",
            "Odd Hours",
            "Velocity Spike",
          ],
          datasets: [{
            data: [3, 2, 2, 1, 3],
            backgroundColor: [
              "#ef4444",
              "#f97316",
              "#f59e0b",
              "#22c55e",
              "#dc2626",
            ],
          }],
        }}
        options={{
          plugins: {
            legend: {
              position: "right",
              labels: { color: theme.text },
            },
          },
        }}
      />
    </div>
  );
}/*
export function LineChart() {
  return (
    <div style={{ height: 300 }}>
      <Line
        data={{
           labels: ["Credit Card", "PayPal", "Debit Card","Bank Transfer"],
          datasets: [
            {
              label: "Fraud Rate",
              data: [3, 9, 5],
              borderColor: "#ef4444",
               backgroundColor: "orange",
              tension: 0.4,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
}
*/
export function LineChart() {
  const { transactions } = useContext(ThemeContext);
   const theme = useChartTheme();
  const fixedLabels = ["Credit Card", "PayPal", "Debit Card", "Bank Transfer"];

  // Count transactions per method dynamically from transactions
  const paymentData = useMemo(() => {
    const counts = transactions.reduce((acc, t) => {
      // Normalize method name to match fixed labels
      let method = t.PaymentMethod;
      if (method.toLowerCase() === "credit card") method = "Credit Card";
      else if (method.toLowerCase() === "paypal") method = "PayPal";
      else if (method.toLowerCase() === "debit card") method = "Debit Card";
      else if (method.toLowerCase() === "bank transfer") method = "Bank Transfer";
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    // Map counts to fixed labels, defaulting to 0 if none
    const dataValues = fixedLabels.map((label) => counts[label] || 0);

    const colors = [
       // PayPal - blue
       
      "rgba(245,158,11,0.9)",  // Debit Card - amber
     
    ];

    return {
      labels: fixedLabels,
      datasets: [
        {
          label: "Number of Transactions",
          data: dataValues,
          backgroundColor: colors,
          borderRadius: 6,
           borderColor: theme.text,
          barThickness: 30,
        },
      ],
    };
  }, [transactions]);

  const options = {
    indexAxis: "y", // horizontal bars
    responsive: true,
    plugins: {
      legend:{labels: { color: theme.text }},
      title: {
        display: true,
        text: "Transactions by Payment Method",
        font: { size: 16, weight: "bold" },
        color: theme.text,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.x} transactions`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Transactions",
          color: theme.text ,
          font: { weight: "bold" },
        },
      },
      y: {
        ticks: {
          color: theme.text ,
          font: { weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="mt-2 p-2 rounded-lg shadow-md">
      <Bar data={paymentData} options={options} />
    </div>
  );
}
export function CountryBubbleChart() {
  return (
    <div style={{ height: 300 }}>
      <Bubble
        data={{
          datasets: [
            { label: "US", data: [{ x: 5, y: 5, r: 20 }], backgroundColor: "#3b82f6" },
            { label: "CA", data: [{ x: 3, y: 4, r: 10 }], backgroundColor: "#22c55e" },
            { label: "NG", data: [{ x: 1, y: 2, r: 12 }], backgroundColor: "#ef4444" },
          ],
        }}
      />
    </div>
  );
}
