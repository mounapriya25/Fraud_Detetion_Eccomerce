import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Signin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userid: "",
    password: "",
    name: "",
    CustomerAge: "",
    location: "",
    sex_M: 0,
  });

  const [msg, setMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      userid: form.userid,
      password: form.password,
      name: form.name,
      AccountAgeDays: 0,
      avg_transaction_amount: 0,
      CustomerAge: Number(form.CustomerAge),
      location: form.location,
      previous_fraud_count: 0,
      sex_M: Number(form.sex_M)
    };

    try {
      const res = await axios.post(`${backendUrl}/signup`, payload);
      setMsg(res.data.message);

      if (res.data.message === "Signup successful") {
        navigate("/login");
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-800 font-sans px-4">
      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md p-10 pt-6 rounded-2xl w-96 shadow-2xl transform transition-transform duration-300 hover:scale-105 overflow-y-auto max-h-[95%]">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-4 tracking-wide">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700 text-sm">User ID</label>
          <input
            type="text"
            name="userid"
            required
            onChange={handleChange}
            className="p-3 mb-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          <label className="mb-1 font-semibold text-gray-700 text-sm">Full Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="p-3 mb-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          <label className="mb-1 font-semibold text-gray-700 text-sm">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            className="p-3 mb-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          <label className="mb-1 font-semibold text-gray-700 text-sm">Age</label>
          <input
            type="number"
            name="CustomerAge"
            required
            onChange={handleChange}
            className="p-3 mb-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          <label className="mb-1 font-semibold text-gray-700 text-sm">Location</label>
          <input
            type="text"
            name="location"
            required
            onChange={handleChange}
            className="p-3 mb-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          />

          <label className="mb-1 font-semibold text-gray-700 text-sm">Gender</label>
          <select
            name="sex_M"
            onChange={handleChange}
            className="p-3 mb-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          >
            <option value={0}>Female</option>
            <option value={1}>Male</option>
          </select>

          <button
            type="submit"
            className="py-3 bg-gradient-to-br from-blue-900 to-indigo-800 text-white rounded-lg font-semibold mt-2 mb-2 text-base shadow-lg hover:opacity-90 transition"
          >
            Register
          </button>

          {msg && (
            <p className="text-red-500 text-center mt-2 text-sm">{msg}</p>
          )}

          <p className="text-center mt-3 text-gray-600 text-base">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-900 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}