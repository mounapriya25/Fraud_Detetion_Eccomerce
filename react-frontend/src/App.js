import { useContext,useEffect, useState } from "react";
import FraudDashboard from "./Dashboard";
import  AnalysisPage from "./Analysis";
import  Signup from "./signin";
import  Login from "./login";
import  Landingpage from "./Landingpage";
import  Logoutuser from "./Logout";
import  Shopping from "./Shop";
import  Check from "./TranstionCheck";
import   Checkout from "./Amazon-clone/Cart";
import  Ecommerce from "./Amazon-clone/Projucts";
import {BrowserRouter,Route,Routes} from "react-router-dom"


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<FraudDashboard/>}/>
      <Route path="/analysis" element={<AnalysisPage/>}/>
      <Route path="/shop" element={<Shopping/>}/>
      <Route path="/h" element={<Ecommerce/>}/>
      <Route path="/cart2" element={<Checkout/>}/>
      <Route path="/cart" element={<Check/>}/>
      <Route path="/signin" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logoutuser/>}/>
      <Route path="/" element={<Landingpage/>}/>
      
      
    </Routes>
   </BrowserRouter>
  );
}

export default App;
