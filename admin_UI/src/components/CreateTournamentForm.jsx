import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TournamentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    map: "",
    entryFee: "",
    winningCriteria: "",
    prize: "",
    gameMode: "",
    matchStartTime: "",
  });

  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("No token found! Please login.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/tournaments/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Tournament created successfully!");
      navigate("/admin/dashboard")
    
      
      // Reset the form after successful submission
      setFormData({
        map: "",
        entryFee: "",
        winningCriteria: "",
        prize: "",
        gameMode: "",
        matchStartTime: "",
      });
    } catch (error) {
      console.error("Error creating tournament:", error);
      alert("Failed to create tournament.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-yellow-400 text-xl mb-4 text-center">Create Tournament</h2>

        <label className="block text-gray-300 mb-2">Map</label>
        <input
          type="text"
          name="map"
          value={formData.map}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border border-yellow-500 rounded bg-gray-700 text-white"
        />

        <label className="block text-gray-300 mb-2">Entry Fee (₹)</label>
        <input
          type="number"
          name="entryFee"
          value={formData.entryFee}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border border-yellow-500 rounded bg-gray-700 text-white"
        />

        <label className="block text-gray-300 mb-2">Winning Criteria</label>
        <input
          type="text"
          name="winningCriteria"
          value={formData.winningCriteria}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border border-yellow-500 rounded bg-gray-700 text-white"
        />

        <label className="block text-gray-300 mb-2">Prize (₹)</label>
        <input
          type="number"
          name="prize"
          value={formData.prize}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border border-yellow-500 rounded bg-gray-700 text-white"
        />

        <label className="block text-gray-300 mb-2">Game Mode</label>
        <input
          type="text"
          name="gameMode"
          value={formData.gameMode}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border border-yellow-500 rounded bg-gray-700 text-white"
        />

        <label className="block text-gray-300 mb-2">Match Start Time</label>
        <input
          type="datetime-local"
          name="matchStartTime"
          value={formData.matchStartTime}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border border-yellow-500 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded"
        >
          Create Tournament
        </button>
      </form>
    </div>
  );
};

export default TournamentForm;
