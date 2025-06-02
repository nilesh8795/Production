import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-yellow-400 text-xl font-bold">PUBG Tournament Admin</h1>
      <div className="flex items-center gap-4">
        {admin && <p className="text-white font-medium">Welcome, {admin.admin.name}</p>}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
