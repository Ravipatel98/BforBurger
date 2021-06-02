import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaBars } from "react-icons/fa";
import "../../App.css";

const NavBar = ({ loggedInUser }) => {
  console.log("loggedInUser", loggedInUser);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="header">
        <nav>
          <Link className="links" to="/">
            <div className="logo">B4Burger</div>
          </Link>
          <div>
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
            </ul>
          </div>
          <div>
            <Link to="/signup" className="links">
              <li>Sign Up</li>
            </Link>
            <Link to="/login" className="links">
              <li>Log In</li>
            </Link>
          </div>
          {/* {Object.keys(loggedInUser).length === 0*/}
          <FaBars className="burger" onClick={() => setIsOpen(!isOpen)} />
        </nav>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loggedInUser: state.authReducer.loggedInUser,
  };
};

export default connect(mapStateToProps, null)(NavBar);
