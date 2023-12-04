import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import useProfileInfo from "../hooks/useProfileInfo";

const NavBar = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  var profile = useProfileInfo();
  const toggleActive = () => {
    setHamburgerActive((current) => !current);
    console.log(profile);
  };

  return (
    <>
      <div
        className={hamburgerActive ? "link_container active" : "link_container"}
      >
        {!profile ? (
          <>
            <Link onClick={toggleActive} className="link navbar_link" to="/">
              Home
            </Link>
            <Link
              onClick={toggleActive}
              className="link navbar_link"
              to="/Profile"
            >
              Profile
            </Link>
            <Link
              onClick={toggleActive}
              className="link navbar_link"
              to="/Learn"
            >
              Learn
            </Link>
            <Link
              onClick={toggleActive}
              className="link navbar_link"
              to="/Review"
            >
              Review
            </Link>
            <Link onClick={toggleActive} className="link navbar_link" to="/">
              Log out
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link onClick={toggleActive} className="link navbar_link" to="/">
              Home
            </Link>
            <Link
              onClick={toggleActive}
              className="link navbar_link"
              to="/LogIn"
            >
              Log in
            </Link>
            <Link
              onClick={toggleActive}
              className="link navbar_link"
              to="/SignUp"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
      <div
        onClick={toggleActive}
        className={hamburgerActive ? "hamburger active" : "hamburger"}
      >
        <span className="hamburger_bar"></span>
        <span className="hamburger_bar"></span>
        <span className="hamburger_bar"></span>
      </div>
    </>
  );
};

export default NavBar;
