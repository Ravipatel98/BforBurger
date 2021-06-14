import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateUser, loadUsers } from "../../redux/actions/userActions";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = ({ updateUser, userDetails }) => {
  const [user, setUser] = useState({
    _id: "",
    userName: "",
    role: "",
    contactNumber: 0,
  });

  const history = useHistory();

  useEffect(() => {
    setUser({
      _id: userDetails._id,
      userName: userDetails.userName,
      role: userDetails.role,
      contactNumber: userDetails.contactNumber,
    });
  }, [userDetails]);

  const resetForm = () => {
    setUser({
      _id: "",
      userName: "",
      role: "",
      contactNumber: 0,
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
    const response = await updateUser(user);
    console.log(response);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User updated successfully!",
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
    loadUsers();
    history.push("/admin");
    resetForm();
  };

  return (
    <div className="center">
      <h1>Update User</h1>
      <form onSubmit={onSubmit}>
        <div className="txt_field">
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={user.userName}
            disabled
          />
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
          Update
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userDetails: state.userReducer.updateUserDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    loadUsers: () => dispatch(loadUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
