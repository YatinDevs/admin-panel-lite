// api.js

import axios from "axios";

const BASE_URL = "http://localhost:4004/api/v1"; // Your backend API base URL

export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/customers`, customerData);
    return response.data; // Assuming the response contains the created customer data
  } catch (error) {
    throw new Error("Failed to create customer");
  }
};


export const createUsers = async (customerData) => {
  try {
    console.log(customerData)
    const response = await axios.post(`${BASE_URL}/Users`, customerData);
    return response.data; // Assuming the response contains the created customer data
  } catch (error) {
    throw new Error("Failed to create customer");
  }
};


export const createLoad = async (loadData) => {
  try {
    const response = await axios.post(`${BASE_URL}/loads`, loadData);
    return response.data; // Assuming the response contains the created load data
  } catch (error) {
    throw new Error("Failed to create load");
  }
};

export const createSpace = async (spaceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/spaces`, spaceData);
    return response.data; // Assuming the response contains the created space data
  } catch (error) {
    throw new Error("Failed to create space");
  }
};

export const createMatch = async (matchData) => {
  try {
    const response = await axios.post(`${BASE_URL}/matches`, matchData);
    return response.data; // Assuming the response contains the created match data
  } catch (error) {
    throw new Error("Failed to create match");
  }
};
