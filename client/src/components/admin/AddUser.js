import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions/userActions";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = ({ addUser }) => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    role: "",
    contactNumber: "",
  });

  const history = useHistory();

  const resetForm = () => {
    setUser({
      userName: "",
      password: "",
      role: "",
      contactNumber: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await addUser(user);
    console.log(response);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User added successfully!",
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
    history.push("/admin");
    resetForm();
  };
  return (
    <div className="center">
      <h1>Add User</h1>
      <form onSubmit={onSubmit}>
        <div className="txt_field">
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={user.userName}
            required
          />
          <span></span>
          <label htmlFor="userName">Name</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            required
          />
          <span></span>
          <label htmlFor="password">Password</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            name="role"
            onChange={handleChange}
            value={user.role}
            required
          />
          <span></span>
          <label htmlFor="role">Role</label>
        </div>
        <div className="txt_field">
          <input
            type="number"
            name="contactNumber"
            onChange={handleChange}
            value={user.contactNumber}
            required
          />
          <span></span>
          <label htmlFor="contactNumber">Contact Number</label>
        </div>
        <button type="submit" className="btn-submit">
          Save
        </button>
        <Link to="/admin">
          <button type="button" className="btn-cancel">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
