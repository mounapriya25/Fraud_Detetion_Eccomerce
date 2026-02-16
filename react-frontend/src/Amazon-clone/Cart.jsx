import { useEffect, useState, useContext } from "react";
import { products } from "./products2";
import {
  getCart,
  deleteprd,
  updatedeliveryopt,
  addcart,
} from "./10-cart";
import { ThemeContext } from "../ThemeContest";
import { useNavigate } from "react-router-dom";
import Arrow from "@mui/icons-material/ArrowBack"

export default function PlaceOrder() {
  const { dark } = useContext(ThemeContext);
  const [cartItems, setCartItems] = useState([]);

  const nav=useNavigate()

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
    const product = products.find(
      (p) => p.id === item.productid
    );
    return { ...product, quantity: item.quantity, deliveryid: item.deliveryid };
  });

  function getShippingCost(deliveryid) {
    if (deliveryid === "1") return 0;
    if (deliveryid === "2") return 50;
    if (deliveryid === "3") return 70;
    return 0;
  }

  const itemsTotal = fullCart.reduce(
    (sum, item) => sum + (item.priceCents) * item.quantity,
    0
  );

  const shippingTotal = fullCart.reduce(
    (sum, item) => sum + getShippingCost(item.deliveryid),
    0
  );

  const tax = itemsTotal * 0.01;
  const finalTotal = itemsTotal + shippingTotal + tax;

  return (
    <div className={`min-h-screen p-6 transition-colors ${
      dark ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-800"
    }`}>
      
      <h2 className="text-2xl font-bold mb-6  ">
        <Arrow  className="mr-2 mb-1"onClick={()=>nav("/shop")}/>
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
                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-yellow-500 font-semibold mt-2">
                    ₹{item.priceCents }
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1 bg-gray-300 dark:bg-zinc-700 rounded"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

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
                  <p className="font-semibold mb-2">
                    Choose delivery:
                  </p>

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
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div
          className={`rounded-2xl shadow-lg p-6 h-fit ${
            dark ? "bg-zinc-900" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">
            Order Summary
          </h3>

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
            className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-bold text-black"
            onClick={() => alert("Order Placed Successfully!")}
          >
            Place your order
          </button>
        </div>
      </div>
    </div>
  );
}
