// LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-500 to-indigo-800 flex flex-col items-center justify-center text-white px-4">
      {/* App Name */}
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
        Real-Time Fraud Detection
      </h1>

      {/* Description */}
      <p className="mb-8 text-lg md:text-xl text-gray-200 text-center max-w-xl">
        Monitor e-commerce transactions in real-time and detect anomalies or fraud instantly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/signin")}
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Sign In
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-transparent border border-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
        >
          Login
        </button>
      </div>

      {/* Footer */}
      <p className="text-gray-200 mt-12 text-sm text-center max-w-md">
        Secure, fast, and scalable fraud detection for your e-commerce platform.
      </p>
    </div>
  );
}