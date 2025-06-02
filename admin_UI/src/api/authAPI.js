import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin"; // Replace with your actual API URL

export const loginAPI = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed!";
  }
};

export const fetchAdminAPI = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch admin data!";
  }
};
