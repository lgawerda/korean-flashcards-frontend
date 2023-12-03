import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import useProfileInfo from "../hooks/useProfileInfo";
const Home = () => {
  var profile = useProfileInfo();
  return (
    <>
      {profile ? (
        <></>
      ) : (
        <div className="container">
          <div className="text">Welcome to my Flashcards App!</div>
          <Link className="link home-link" to="/SignUp">
            Start learning now!
          </Link>
          <Link className="link home-link" to="/LogIn">
            Log In
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
