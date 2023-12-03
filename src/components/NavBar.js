import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);

  const toggleActive = () => {
    setHamburgerActive((current) => !current);
  };

  return (
    <>
      <div
        className={hamburgerActive ? "link_container active" : "link_container"}
      >
        <a className="link navbar_link" href="#">
          Log in
        </a>
        <a className="link navbar_link" href="#">
          Sign up
        </a>
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
