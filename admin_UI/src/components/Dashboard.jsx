import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiCreditCard, FiDollarSign, FiPieChart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = "http://localhost:5000/api/tournaments";

const data = [
  { name: "Jan", expense: 1200, income: 1500 },
  { name: "Feb", expense: 1000, income: 1800 },
  { name: "Mar", expense: 1400, income: 1600 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMatches, setActiveMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [winnerName, setWinnerName] = useState("");
  const [history,setHistory] = useState([]);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  
  const fetchActiveMatches = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/active`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveMatches(response.data);
    } catch (error) {
      console.error("Failed to fetch active matches", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data)
      
    } catch (error) {
      console.error("Failed to fetch active matches", error);
    }
  };

  useEffect(() => {
    fetchActiveMatches();
    fetchHistory(); 
  }, [token]);
  
  const createTournament = () => {
    navigate("/admin/createTournament");
  };

  const handleHistory = () => {
    navigate("/tournament/History");
  };

  const handleFinishClick = (match) => {
    console.log("Finish button clicked for match:", match);
    setSelectedMatch(match);
    setShowModal(true);
  };

  const handleSaveWinner = async () => {
    if (!winnerName) {
      alert("Please enter a winner name.");
      return;
    }

    try {
      console.log("Saving winner:", winnerName, "for match:", selectedMatch);
      await axios.put(
        `${API_BASE_URL}/finish/${selectedMatch._id}`,
        { winner: winnerName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setShowModal(false);
      setWinnerName("");

      // Remove finished match from active matches
      setActiveMatches((prevMatches) => prevMatches.filter((m) => m._id !== selectedMatch._id));

      alert("Winner saved successfully!");
    } catch (error) {
      console.error("Failed to save winner", error);
      alert("Error saving winner. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-200 p-5">
      {/* Sidebar */}
      <div className="w-20 bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center">
        <FiCreditCard size={24} className="mb-5 text-gray-400" />
        <FiDollarSign size={24} className="mb-5 text-gray-400" />
        <FiPieChart size={24} className="text-gray-400" onClick={handleHistory} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Cards */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-400">Expense</h3>
            <p className="text-xl font-bold">₹12,450</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-400">Income</h3>
            <p className="text-xl font-bold">₹18,750</p>
          </div>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300"
            onClick={createTournament}
          >
            Create Tournament
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Bar Chart */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#fbbf24" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="expense" fill="#FF6384" />
                <Bar dataKey="income" fill="#36A2EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Matches Table */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-3">Active Matches</h3>
            {activeMatches.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="p-2">Map</th>
                    <th className="p-2">Entry Fee</th>
                    <th className="p-2">Prize</th>
                    <th className="p-2">Game Mode</th>
                    <th className="p-2">Winning Criteria</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeMatches.map((match) => (
                    <tr key={match._id} className="border-b border-gray-600">
                      <td className="p-2">{match.map}</td>
                      <td className="p-2">₹{match.entryFee}</td>
                      <td className="p-2">₹{match.prize}</td>
                      <td className="p-2">{match.gameMode}</td>
                      <td className="p-2">{match.winningCriteria}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleFinishClick(match)}
                          className="bg-blue-500 px-3 py-1 rounded"
                        >
                          Finish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No active matches available</p>
            )}
          </div>
        </div>
      <div className="mt-[50px]">
              <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Player name
                </th>
                <th scope="col" className="px-6 py-3">
                  Prize
                </th>
                <th scope="col" className="px-6 py-3">
                  Entry Fee
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
            {
              history.map((data) => {
                console.log(data.updatedAt);
                
                // Extract only the date part using slice
                const dateOnly = data.updatedAt.slice(0, 10);

                return (
                  <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.winner}
                    </th>
                    <td className="px-6 py-4">{data.prize}</td>
                    <td className="px-6 py-4">{data.entryFee}</td>
                    <td className="px-6 py-4">{dateOnly}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>

      </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter Winner Name</h2>
            <input
              type="text"
              placeholder="Winner Name"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              value={winnerName}
              onChange={(e) => setWinnerName(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowModal(false)} className="mr-2 bg-gray-600 px-3 py-1 rounded">
                Cancel
              </button>
              <button onClick={handleSaveWinner} className="bg-blue-500 px-3 py-1 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Dashboard;
