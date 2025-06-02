import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.payload?.token) navigate("/admin/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="border border-yellow-500 p-8 rounded-lg w-96 bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">🔥 Admin Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="w-full px-4 py-2 border border-yellow-400 bg-gray-700 text-gray-200 rounded-md outline-none focus:ring-2 "
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            className="w-full px-4 py-2 border border-yellow-400 bg-gray-700 text-gray-200 rounded-md outline-none focus:ring-2"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full border border-yellow-500 text-yellow-500 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition duration-300 font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
