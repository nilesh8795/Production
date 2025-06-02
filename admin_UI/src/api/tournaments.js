import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tournaments"; // Replace with your actual API URL

export const createtournaments = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "tournaments creation failed!";
  }
};