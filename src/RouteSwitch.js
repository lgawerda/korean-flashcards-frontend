import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Learn from "./pages/Learn";
import Review from "./pages/Review";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Learn" element={<Learn />} />
        <Route path="/Review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
