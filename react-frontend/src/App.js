import { useContext,useEffect, useState } from "react";
import FraudDashboard from "./Dashboard";
import  AnalysisPage from "./Analysis";
import  Shopping from "./Shop";
import  Check from "./TranstionCheck";
import   Checkout from "./Amazon-clone/Cart";
import  Ecommerce from "./Amazon-clone/Header";
import {BrowserRouter,Route,Routes} from "react-router-dom"


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FraudDashboard/>}/>
       <Route path="/analysis" element={<AnalysisPage/>}/>
       <Route path="/shop" element={<Shopping/>}/>
        <Route path="/h" element={<Ecommerce/>}/>
      <Route path="/cart2" element={<Checkout/>}/>
      <Route path="/cart" element={<Check/>}/>
      
      
    </Routes>
   </BrowserRouter>
  );
}

export default App;
