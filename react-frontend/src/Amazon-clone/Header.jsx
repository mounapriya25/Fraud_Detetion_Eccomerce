import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContest";
import { useNavigate } from "react-router-dom";
import { products } from "./products2";
import { addcart, updatecart } from "./10-cart";
import Search from "@mui/icons-material/Search"
import Cart from "@mui/icons-material/ShoppingCart"
import AddCart from "@mui/icons-material/AddShoppingCart"

const categories = ["All", "Electronics", "Clothing", "Accessories"];

export default function ProductGrid() {
  const { dark, setDark } = useContext(ThemeContext);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const nav=useNavigate()

  useEffect(() => {
    setCartCount(updatecart());
  }, []);

  const filtered = products.filter((p) => {
    const matchCat =
      activeCat === "All" ||
      p.category?.toLowerCase() === activeCat.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 transition-colors">

      {/* TOP BAR */}
      <div className="w-10/12   grid  grid-cols-2 py-6">

        {/* Search */}
        <div className="relative">
          <div className="absolute left-2 top-2.5"><Search/></div>
            <input
          type="text"
          placeholder='Search products'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-5 py-3 w-64 rounded-full
                     bg-zinc-200 text-black dark:text-white pl-10 dark:bg-zinc-700 placeholder:text-gray-600  dark:placeholder:text-gray-100
                     font-medium shadow focus:outline-none"
        />
        </div>

        
        {/* Cart */}
        <div className="ml-auto relative   ">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full
                              bg-zinc-200 font-semibold dark:bg-zinc-700 dark:text-zinc-100  text-zinc-600 shadow" onClick={()=>nav("/cart")}>
            <Cart/> Cart
          </button>
          <span className="absolute -top-2 -right-2 bg-yellow-400
                           text-zinc-900 text-xs font-bold px-2 rounded-full">
            {cartCount}
          </span>
        </div>

           </div>
       
     

      {/* PRODUCTS */}
      <div className="w-10/12 ml-0 mr-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-zinc-200 dark:bg-zinc-900 rounded-3xl shadow-xl
                       hover:shadow-xl transition overflow-hidden"
          >
            {/* IMAGE FIXED (NO ZOOM) */}
            <div className="relative h-60 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center p-6">
              <img
                src={p.image}
                alt={p.name}
                className="max-h-full max-w-full object-contain"
              />

              {/* Category Badge */}
              
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
                  {p.name}
                </h3>
                <span className="text-yellow-300 font-semibold">
                  ⭐ {p.rating.stars}
                </span>
              </div>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                {p.category}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-500">
                    ₹{p.priceCents}
                  </p>
                  <p className="text-sm text-zinc-400">Free shipping</p>
                </div>

                {/* ADD BUTTON (WORKING) */}
                <button
                  onClick={() => {
                    addcart(p.id, 1);
                    setCartCount(updatecart());
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full
                             bg-green-600 text-zinc-700 dark:text-zinc-100 font-semibold
                             hover:scale-105 transition"
                >
                 <AddCart/> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
