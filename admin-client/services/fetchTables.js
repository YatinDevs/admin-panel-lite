import axios from "axios";

const BASE_URL = "http://localhost:4004/api/v1"; // Your backend API base URL

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers`);
    return response.data; // Assuming the response contains the customer data
  } catch (error) {
    throw new Error("Failed to fetch customers");
  }
};

export const fetchLoads = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/loads`);
    return response.data; // Assuming the response contains the load data
  } catch (error) {
    throw new Error("Failed to fetch loads");
  }
};

export const fetchSpaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/spaces`);
    return response.data; // Assuming the response contains the space data
  } catch (error) {
    throw new Error("Failed to fetch spaces");
  }
};

export const fetchMatches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/matches`);
    console.log(response);
    return response.data.data; // Assuming the response contains the match data
  } catch (error) {
    throw new Error("Failed to fetch matches");
  }
};
