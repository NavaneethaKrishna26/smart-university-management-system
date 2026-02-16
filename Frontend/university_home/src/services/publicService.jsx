import axios from "axios";

const BASE_URL = "http://localhost:8080/api/public";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch events";
  }
};
