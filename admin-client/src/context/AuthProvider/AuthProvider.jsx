import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Creating context
const AuthContext = createContext();

// AuthProvider component
export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // On initial render, check if user is already logged in
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const employeeDetails = JSON.parse(localStorage.getItem("employeeDetails"));
    if (authToken && employeeDetails) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle user login
  async function logIn(user) {
    try {
      const response = await fetch(
        "http://localhost:4004/api/v1/employees/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem(
          "employeeDetails",
          JSON.stringify(data.employeeDetails)
        );
        navigate("/dashboard"); // Redirect to dashboard or any other route
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function signUp(user) {
    try {
      const response = await fetch(
        "http://localhost:4004/api/v1/employees/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Signup request failed");
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("employeeDetails", JSON.stringify(data.data));
        navigate("/dashboard");
      } else {
        throw new Error(data.error || "Signup request failed");
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      throw new Error("Signup failed. Please try again.");
    }
  }

  // Function to handle user logout
  function logOut() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("employeeDetails");
    navigate("/login"); // Redirect to login page
  }

  // Context provider value
  const provider = {
    isLoggedIn: !!localStorage.getItem("authToken"),
    authToken: localStorage.getItem("authToken"),
    employeeDetails: JSON.parse(localStorage.getItem("employeeDetails")),
    logIn,
    signUp,
    logOut,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
