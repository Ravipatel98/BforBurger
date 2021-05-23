import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../../App.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav>
        <Link className="links" to="/">
          <div className="logo">B4Burger</div>
        </Link>
        <ul
          className="nav-links"
          style={{
            transform: isOpen ? "translateX(0px)" : "",
          }}
        >
          <Link to="/items" className="links">
            <li>Items</li>
          </Link>
          <Link to="/items" className="links">
            <li>Kitchen</li>
          </Link>
          <Link to="/items" className="links">
            <li>Admin</li>
          </Link>
          <Link to="/items" className="links">
            <li>Sign In</li>
          </Link>
          <Link to="/items" className="links">
            <li>Sign Up</li>
          </Link>
        </ul>
        <FaBars className="burger" onClick={() => setIsOpen(!isOpen)} />
      </nav>
    </>
  );
};

export default NavBar;
