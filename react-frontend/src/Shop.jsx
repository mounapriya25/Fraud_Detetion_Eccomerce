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
import ProductGrid from "./Amazon-clone/Header"
import Shop2 from "@mui/icons-material/ShoppingBasket"


 export default function Shopping() {
  const {dark,setDark}=useContext(ThemeContext)
  const nav=useNavigate()

  return (
    <div className=" flex flex-row  bg-zinc-100 h-full text-gray-700 dark:bg-gray-950 dark:text-gray-100">

      <div  className="flex flex-col  gap-5 p-3 pl-3 pt-5 mr-8 bg-gray-200 text-black dark:bg-gray-800 dark:text-gray-300  pr-2 ">
        <div className=" border-1 h-10 pt-1.5 p-2  rounded-xl   text-gray-100   bg-blue-500 dark:text-gray-100 "  >  <Security /></div>
          <div className=" border-1 h-10 p-2 rounded-lg pb-3  text-gray-700 dark:text-gray-100  hover:bg-gray-400 hover:dark:bg-gray-500 " onClick={()=>nav("/")} title="Dashboard"><Dashboard /></div>
     
          <div className=" border-1 h-10 p-2 rounded-lg pb-3  text-gray-700 dark:text-gray-100  bg-gray-400 dark:bg-gray-500 "  onClick={()=>nav("/shop")} title="Shop"><Shop/></div>
       
      </div>
      
      <div className="mt-3 min-h-screen min-w-full" >
       
        <div className=" w-10/12 lg:w-11/12 flex flex-row  gap-2  mt-3 mr-10  border-b-4  dark:border-b-2 dark:border-zinc-300 border-zinc-200 pb-3  ">
          <div className=" border-1 p-1  rounded-lg   text-white   bg-green-400  ">  <Shop2/></div>
          <h3 className="text-2xl font-bold">Shop</h3>

          <div className=" absolute right-10 top-4 shadow-md border  bg-zinc-300/20 dark:bg-zinc-900  dark:border-0 rounded-3xl  text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
            <button
              onClick={() => setDark(!dark)}
              className=" px-4 py-2 text-yellow-400 dark:text-yellow-300 ">
              {dark ? <Light/> :<Dark/>}
            </button>
           </div>
           
           </div>
           
            <ProductGrid/>
      
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