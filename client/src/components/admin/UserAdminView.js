import React, { useState, useEffect } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserDetails } from "../../redux/actions/userActions";
import "./Admin.css";

const UserAdminView = ({ loadUsers, users, removeUser, updateUserDetails }) => {
  const [q, setQ] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);

  const filterRows = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await loadUsers();
      setListOfUsers(fetchedUsers.data.data);
    };
    fetchUsers();
  }, [loadUsers]);

  const onEdit = (user) => {
    console.log(user);
    const selectedUser = {
      _id: user._id,
      userName: user.userName,
      role: user.role,
      contactNumber: user.contactNumber,
    };
    console.log(selectedUser);
    updateUserDetails(selectedUser);
  };

  return (
    <>
      <div className="title">
        <input
          className="searchbar"
          type="text"
          name="q"
          value={q}
          placeholder="Search..."
          onChange={(e) => setQ(e.target.value)}
        />
        <Link to="/admin/addUser">
          <FaPlus size={23} onClick style={{ color: "#000" }} />
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User name</th>
            <th>Role</th>
            <th>Contact Number</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            filterRows(users).map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.role}</td>
                <td>{user.contactNumber}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <Link to="/admin/updateUser">
                    <FaPen
                      style={{ margin: "3px 5px", color: "#000" }}
                      onClick={() => onEdit(user)}
                    />
                  </Link>
                  <FaTrash
                    style={{ margin: "3px 5px", cursor: "pointer" }}
                    onClick={() => removeUser(user._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDetails: (user) => dispatch(updateUserDetails(user)),
  };
};

export default connect(null, mapDispatchToProps)(UserAdminView);
