import { useEffect, useState, useContext } from "react";
import { products } from "./Amazon-clone/products2";
import {
  getCart,
  deleteprd,
  updatedeliveryopt,
  addcart,
} from "./Amazon-clone/10-cart";
import { ThemeContext } from "./ThemeContest";
import { useNavigate } from "react-router-dom";
import Arrow from "@mui/icons-material/ArrowBack";
import axios from "axios";

export default function PlaceOrder() {
  const { dark, fetchTransactions ,userdata} = useContext(ThemeContext);
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({
     userid:userdata?.userid,
    source: "Direct",
    browser: "Chrome",
    "Payment.Method": "credit card",
    "Device.Used": "mobile",
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    setCartItems([...getCart()]);
  }

  function handleDelete(id) {
    deleteprd(id);
    loadCart();
  }

  function handleIncrease(id) {
    addcart(id, 1);
    loadCart();
  }

  function handleDecrease(id) {
    const item = getCart().find((i) => i.productid === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem("cart1", JSON.stringify(getCart()));
      loadCart();
    }
  }

  function handleDeliveryChange(id, deliveryid) {
    updatedeliveryopt(id, deliveryid);
    loadCart();
  }

  const fullCart = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productid);
    return { ...product, quantity: item.quantity, deliveryid: item.deliveryid };
  });

  const itemsTotal = fullCart.reduce(
    (sum, item) => sum + (item.priceCents ) * item.quantity,
    0
  );

  const shippingTotal = fullCart.reduce((sum, item) => {
    if (item.deliveryid === "1") return sum;
    if (item.deliveryid === "2") return sum + 50;
    if (item.deliveryid === "3") return sum + 70;
    return sum;
  }, 0);

  const tax = itemsTotal * 0.01;
  const finalTotal = itemsTotal + shippingTotal + tax;

  // Handle form inputs for user info
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Place order & send data to Lambda
  const handlePlaceOrder = async () => {
    if(userInfo.userid=="") {alert("Enter User Id") }
    else{
    // Timestamp fields
    const ts = new Date();
    const timestampData = {
      Trans_Year: ts.getFullYear(),
      Trans_Month: ts.getMonth() + 1,
      Trans_Day: ts.getDate(),
      Trans_DayOfWeek: ts.getDay(),
      "Transaction.Hour": ts.getHours(),
    };


    // Prepare cart data for Lambda
    const cartData = fullCart.map((item) => ({
      "Transaction.Amount": item.priceCents,
      Quantity: item.quantity,
      "Address.Match": 1, // you can customize if needed
      "Product.Category": item.category || "electronics",
      "Device.Used": item.device || userInfo["Device.Used"],
      "Payment.Method": item.payment || userInfo["Payment.Method"],
      source: item.source || userInfo.source,
      browser: item.browser || userInfo.browser,
      ...timestampData,
     ...userdata,
      
    }));
    console.log(cartData,'kkkkkkkkkkkkk',userdata)
    try {
      const response = await axios.post(
      "http://localhost:5000/",
      cartData[0]
    );

     fetchTransactions()
      console.log(response)
      setPredictionResult(response.data);
      
    } catch (err) {
      console.error(err);
      setPredictionResult({ error: "Failed to get prediction" });
    }
  }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        dark ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">
        <Arrow className="mr-2 mb-1" onClick={() => nav("/shop")} />
        Checkout ({cartItems.length} items)
      </h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {fullCart.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl shadow-lg p-6 ${
                dark ? "bg-zinc-900" : "bg-white"
              }`}
            >
              <div className="grid md:grid-cols-3 gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain bg-zinc-200 dark:bg-zinc-800 rounded-xl"
                />

                {/* PRODUCT INFO */}
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-yellow-500 font-semibold mt-2">
                    ₹{(item.priceCents).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1 bg-gray-300 dark:bg-zinc-700 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 py-1 bg-gray-300 dark:bg-zinc-700 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 font-semibold mt-3"
                  >
                    Delete
                  </button>
                </div>

                {/* DELIVERY OPTIONS */}
                <div>
                  <p className="font-semibold mb-2">Choose delivery:</p>
                  {[
                    { id: "1", label: "Tuesday - FREE" },
                    { id: "2", label: "Wednesday - ₹50" },
                    { id: "3", label: "Monday - ₹70" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`delivery-${item.id}`}
                        checked={item.deliveryid === option.id}
                        onChange={() =>
                          handleDeliveryChange(item.id, option.id)
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* User Info Form */}
<div
  className={`rounded-2xl shadow-lg p-6 mb-6 transition-colors duration-300 ${
    dark ? "bg-zinc-900 text-white" : "bg-white text-zinc-800"
  }`}
>
  <h3 className="text-2xl font-bold mb-4 border-b pb-2">
    Your Info
  </h3>

  <div className="space-y-4 mt-4">
    

    <div className="grid grid-cols-2 gap-4">
      <select
        name="source"
        value={userInfo.source}
        onChange={handleUserChange}
        className={`w-full p-3 rounded-lg border ${
          dark
            ? "border-zinc-700 bg-zinc-800 text-white"
            : "border-gray-300 bg-gray-50 text-gray-800"
        } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
      >
        <option value="Direct">Direct</option>
        <option value="SEO">SEO</option>
        <option value="Organic">Organic</option>
      </select>

      <select
        name="browser"
        value={userInfo.browser}
        onChange={handleUserChange}
        className={`w-full p-3 rounded-lg border ${
          dark
            ? "border-zinc-700 bg-zinc-800 text-white"
            : "border-gray-300 bg-gray-50 text-gray-800"
        } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
      >
        <option value="Chrome">Chrome</option>
        <option value="Safari">Safari</option>
        <option value="Firefox">Firefox</option>
        <option value="IE">IE</option>
        <option value="Opera">Opera</option>
      </select>

      <select
        name="Payment.Method"
        value={userInfo["Payment.Method"]}
        onChange={handleUserChange}
        className={`w-full p-3 rounded-lg border ${
          dark
            ? "border-zinc-700 bg-zinc-800 text-white"
            : "border-gray-300 bg-gray-50 text-gray-800"
        } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
      >
        <option value="credit card">Credit Card</option>
        <option value="debit card">Debit Card</option>
        <option value="bank transfer">Bank Transfer</option>
        <option value="PayPal">PayPal</option>
      </select>

      <select
        name="Device.Used"
        value={userInfo["Device.Used"]}
        onChange={handleUserChange}
        className={`w-full p-3 rounded-lg border ${
          dark
            ? "border-zinc-700 bg-zinc-800 text-white"
            : "border-gray-300 bg-gray-50 text-gray-800"
        } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
      >
        <option value="mobile">Mobile</option>
        <option value="tablet">Tablet</option>
        <option value="desktop">Desktop</option>
      </select>
    </div>
  </div>
</div>
</div>


        {/* RIGHT SIDE SUMMARY */}
        <div
          className={`rounded-2xl shadow-lg p-6 h-fit ${
            dark ? "bg-zinc-900" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Items Total</span>
            <span>₹{itemsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹{shippingTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (10%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg text-green-600">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          <button
            className="w-full mt-6 bg-yellow-400 hover:bg-yellow-700 py-3 rounded-xl font-bold text-black"
            onClick={handlePlaceOrder}
          >
            Place your order
          </button>

          {predictionResult && (
  <div
    className={`mt-4 p-4 rounded-xl border-2 flex items-center gap-4 ${
      predictionResult.prediction === 0
        ? "border-green-500 bg-green-50 text-green-800"
        : "border-red-500 bg-red-50 text-red-800"
    }`}
  >
    {/* Icon */}
    {predictionResult.prediction === 0 ? (
      <svg
        className="w-6 h-6 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : (
      <svg
        className="w-6 h-6 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )}

    {/* Text */}
    <div>
      <p className="font-semibold text-lg">
        {predictionResult.prediction === 0 ? " Safe Transaction" : " Fraud Detected"}
      </p>
      <p className="text-sm">{predictionResult.message}</p>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
