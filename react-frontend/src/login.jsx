
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContest";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(ThemeContext);

  const [form, setForm] = useState({
    userid: "",
    password: ""
  });
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/login`, form);
      setMsg(res.data.message);

      if (res.data.message === "Login successful") {
        setUser(res.data.userData);
        navigate("/home");
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-800 font-sans px-4">
      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md p-10 pt-7 rounded-2xl w-96 shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-6 tracking-wide">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700 text-sm">User ID</label>
          <input
            type="text"
            name="userid"
            required
            onChange={handleChange}
            className="p-3 mb-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          <label className="mb-2 font-semibold text-gray-700 text-sm">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            className="p-3 mb-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          <button
            type="submit"
            className="py-3 bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-lg font-semibold mt-2 text-base shadow-lg hover:opacity-90 transition"
          >
            Login
          </button>

          {msg && (
            <p className="text-red-500 text-center mt-3 text-sm">
              {msg}
            </p>
          )}

          <p className="text-center mt-4 text-gray-600 text-base">
            New user?{" "}
            <a
              href="/signin"
              className="text-blue-900 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
