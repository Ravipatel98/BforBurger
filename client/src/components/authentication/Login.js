import React, { useState } from "react";
import { connect } from "react-redux";
import "./auth.css";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import axios from "axios";

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
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    history.push("/items");
    resetForm();
  };

  const visitProtected = async (e) => {
    e.preventDefault();
    // const config = {
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // };
    const response = await axios.get("http://localhost:5000/auth/protected");
    console.log(response);
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
        <button type="button" className="btn-submit" onClick={visitProtected}>
          Protected
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
