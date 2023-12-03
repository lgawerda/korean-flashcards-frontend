import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import useProfileInfo from "../hooks/useProfileInfo";
const Home = () => {
  var profile = useProfileInfo();
  return (
    <>
      {profile ? (
        <>
          <div className="container">
            <Link className="link home-link" to="/Learn">
              Learn new words
            </Link>
            <Link className="link home-link" to="/Review">
              Review due cards
            </Link>
          </div>
        </>
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
