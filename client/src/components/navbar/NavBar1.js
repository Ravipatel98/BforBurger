import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import { setLoggedInUser } from "../../redux/actions/authActions";
import { logOutUser } from "../../redux/actions/authActions";
import Swal from "sweetalert2";

const NavBar1 = ({ loggedInUser, logOutUser, cart, setLoggedInUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    console.log(loggedInUser);
    setCartCount(count);
  }, [cart, cartCount]);

  const logInUser = async () => {
    const user = await setLoggedInUser(
      JSON.parse(localStorage.getItem("loggedInUser"))
    );
    console.log(user);
  };

  useEffect(() => {
    logInUser();
  }, []);

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    logOutUser();
    console.log(loggedInUser);
    history.push("/");
    if (localStorage.getItem("token") === "") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully logged out!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 2000,
      });
    }
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
          {JSON.stringify(loggedInUser) !== "{}" &&
            (loggedInUser.data.user.role.toLowerCase() === "admin" ||
              loggedInUser.data.user.role.toLowerCase() === "staff") && (
              <Link to="/kitchen" className="links">
                <li>Kitchen</li>
              </Link>
            )}
          {JSON.stringify(loggedInUser) !== "{}" &&
            loggedInUser.data.user.role.toLowerCase() === "admin" && (
              <Link to="/admin" className="links">
                <li>Admin</li>
              </Link>
            )}
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
      <div>
        {JSON.stringify(loggedInUser) !== "{}" && (
          <Link to="/cart" className="links">
            <FaShoppingCart size={23} className="cart" />
            <span className="cartCount">{cartCount}</span>
          </Link>
        )}
      </div>
      <FaBars className="burger" onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.authReducer.loggedInUser,
    cart: state.itemReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
    setLoggedInUser: (userDetails) => dispatch(setLoggedInUser(userDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar1);
