import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContest";
import {BarChart ,PieChart,CountryBubbleChart,AnomaliesChart,LineChart,FraudTrendChart,CategoryChart}from "./charts/Bar"
import HomeIcon from "@mui/icons-material/Home";
import Security from "@mui/icons-material/Security";
import Dashboard from "@mui/icons-material/DashboardOutlined";
import Analysis from "@mui/icons-material/DonutLargeOutlined";
import Chart from "@mui/icons-material/AnalyticsOutlined";
import Light from "@mui/icons-material/LightModeSharp";
import Dark from "@mui/icons-material/DarkMode";
import Shop from "@mui/icons-material/LocalMall";
import Logout from "@mui/icons-material/LogoutOutlined";
import ProductGrid from "./Amazon-clone/Projucts"
import Shop2 from "@mui/icons-material/ShoppingBasket"


 export default function Logoutuser() {
  const {dark,setDark}=useContext(ThemeContext)
  const nav=useNavigate()

  return (
    <div className=" min-h-screen min-w-full flex flex-row  bg-zinc-100  text-gray-700 dark:bg-gray-950 dark:text-gray-100">

      <div  className="flex flex-col  gap-5 p-3 pl-3 pt-5 mr-8 bg-gray-200 text-black dark:bg-gray-800 dark:text-gray-300  pr-2 ">
        <div className=" border-1 h-10 pt-1.5 p-2  rounded-xl   text-gray-100   bg-blue-500 dark:text-gray-100 "  >  <Security /></div>
          <div className=" border-1 h-10 p-2 rounded-lg pb-3  text-gray-700 dark:text-gray-100  hover:bg-gray-400 hover:dark:bg-gray-500 " onClick={()=>nav("/home")} title="Dashboard"><Dashboard /></div>
     
          <div className=" border-1 h-10 p-2 rounded-lg pb-3  text-gray-700 dark:text-gray-100  hover:bg-gray-400 hover:dark:bg-gray-500 "  onClick={()=>nav("/shop")} title="Shop"><Shop/></div>
             <div className=" border-1 h-10 p-2 rounded-lg pb-3  text-gray-700 dark:text-gray-100  bg-orange-500 dark:bg-orange-500 " title="Logout"><Logout /></div>
     
      </div>
      
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
  <div className="bg-white w-96 rounded-2xl shadow-2xl p-8 text-center">

    <h1 className="text-xl font-semibold text-gray-800 mb-6">
      Do you want to logout?
    </h1>

    <div className="flex justify-center gap-6">

      <button className="px-6 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition duration-300" onClick={() => nav("/login")}>
        Yes
      </button>

      <button className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-400 transition duration-300" onClick={() => nav("/home")} >
        No
      </button>

    </div>
  </div>
</div>
    </div>

  );
}
/*grid grid-cols-1 md:grid-cols-2 ,flex flex-col  gap-5,text-2xl font-semibold,rounded-lg

🔥 What import "../chartSetup" actually does
Loads chartSetup.js
Executes ChartJS.register(...)
Import = bring the tool
Register = tell Chart.js to use the tool
 
*/