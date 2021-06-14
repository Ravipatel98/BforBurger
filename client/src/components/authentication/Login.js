import React, { useState } from "react";
import { connect } from "react-redux";
import "./auth.css";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import Swal from "sweetalert2";

const Login = ({ loginUser }) => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });

  const history = useHistory();

  const resetForm = () => {
    setUserDetails({
      userName: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(userDetails);
    if (response) {
      localStorage.setItem("loggedInUser", JSON.stringify(response));
      localStorage.setItem("token", response.data.token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged In successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      history.push("/items");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Username or Password",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    resetForm();
  };

  return (
    <div className="center">
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <div className="txt_field">
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={userDetails.userName}
            required
          />
          <span></span>
          <label htmlFor="userName">Username</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userDetails.password}
            required
          />
          <span></span>
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn-submit">
          Log In
        </button>
        <div className="signup_link">
          Already have an account? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userDetails) => dispatch(loginUser(userDetails)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
