import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminTournamentTable = () => {
  const [tournaments, setTournaments] = useState([]);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        if (!token) {
          console.error("No token found!");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/tournaments/getournament", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched tournaments:", response.data);
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, [token]);

  const handleDelete = async (id) => {
  alert("clicked")
  };

  const handleEdit = (id) => {
    console.log("Edit tournament:", id);
    // Implement edit functionality (e.g., open a modal with form fields to edit tournament details)
  };

  return (
    <div className="overflow-x-auto p-4 bg-gray-900 min-h-screen flex items-center justify-center">
      <table className="w-[1200px] bg-gray-800 border border-yellow-500 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700 text-yellow-400">
            <th className="p-3 border border-yellow-500">Map</th>
            <th className="p-3 border border-yellow-500">Entry Fee</th>
            <th className="p-3 border border-yellow-500">Winning Criteria</th>
            <th className="p-3 border border-yellow-500">Prize</th>
            <th className="p-3 border border-yellow-500">Game Mode</th>
            <th className="p-3 border border-yellow-500">Match Start Time</th>
            <th className="p-3 border border-yellow-500">Created By</th>
            <th className="p-3 border border-yellow-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament._id} className="text-center border border-yellow-500 text-gray-200">
              <td className="p-3 border border-yellow-500">{tournament.map}</td>
              <td className="p-3 border border-yellow-500">₹{tournament.entryFee}</td>
              <td className="p-3 border border-yellow-500">{tournament.winningCriteria}</td>
              <td className="p-3 border border-yellow-500">₹{tournament.prize}</td>
              <td className="p-3 border border-yellow-500">{tournament.gameMode}</td>
              <td className="p-3 border border-yellow-500">{new Date(tournament.matchStartTime).toLocaleString()}</td>
              <td className="p-3 border border-yellow-500">{tournament.createdBy}</td>
              <td className="p-3 border border-yellow-500">
                <button
                  onClick={() => handleEdit(tournament._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tournament._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTournamentTable;
