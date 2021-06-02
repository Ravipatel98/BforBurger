import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import { logOutUser } from "../../redux/actions/authActions";

const NavBar1 = ({ loggedInUser, logOutUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const handleLogOut = () => {
    localStorage.setItem("token", "");
    logOutUser();
    console.log(loggedInUser);
    history.push("/");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link className="links" to="/">
          B4Burger
        </Link>
      </div>
      <nav>
        <ul
          className="nav__links"
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
          <Link to="/admin" className="links">
            <li>Admin</li>
          </Link>
        </ul>
      </nav>
      <ul className="nav__links__auth">
        {Object.keys(loggedInUser).length === 0 ? (
          <>
            <Link to="/signup" className="links">
              <li>Sign Up</li>
            </Link>
            <Link to="/login" className="links">
              <li>Log In</li>
            </Link>
          </>
        ) : (
          <>
            <li>Welcome, {loggedInUser.data.user.userName}</li>
            <li className="links" onClick={handleLogOut}>
              Log Out
            </li>
          </>
        )}
      </ul>
      <FaShoppingCart size={23} className="cart" />
      <FaBars className="burger" onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.authReducer.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar1);
