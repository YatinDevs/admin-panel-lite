import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/homePage/Home";
import AuthProvider from "./context/AuthProvider/AuthProvider";
import LoginTab from "./components/HeroForm/LoginTab";
import SignupTab from "./components/HeroForm/SignupTab";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<SignupTab />} />
            <Route path="/login" element={<LoginTab />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
