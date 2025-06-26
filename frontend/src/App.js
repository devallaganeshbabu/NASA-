import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Apod from "./pages/Apod";
import MarsRovers from "./pages/MarsRovers";
import Epic from "./pages/Epic";
import NeoWs from "./pages/NeoWs";
import NasaLibrary from "./pages/NasaLibrary";
import Navbar from "./components/Navbar";

const App = () => {
  const [userName, setUser] = useState(null);
const [checkingAuth, setCheckingAuth] = useState(true); // <-- NEW

useEffect(() => {
  const storedUser = localStorage.getItem("userName");
  if (storedUser) {
    setUser(storedUser);
  }
  setCheckingAuth(false); // <-- Wait is over
}, []);


return (
  <Router>
    <Navbar userName={userName} setUser={setUser} />
    
    {checkingAuth ? (
      <div>Loading...</div> // You can style this later
    ) : (
      <Routes>
        <Route path="/" element={<Navigate to={userName ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={userName ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/signup" element={userName ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={userName ? <Dashboard userName={userName} /> : <Navigate to="/login" />} />
        <Route path="/apod" element={userName ? <Apod /> : <Navigate to="/login" />} />
        <Route path="/mars" element={userName ? <MarsRovers /> : <Navigate to="/login" />} />
        <Route path="/epic" element={userName ? <Epic /> : <Navigate to="/login" />} />
        <Route path="/neo" element={userName ? <NeoWs /> : <Navigate to="/login" />} />
        <Route path="/library" element={userName ? <NasaLibrary /> : <Navigate to="/login" />} />
      </Routes>
    )}
  </Router>
);
};
export default App;
