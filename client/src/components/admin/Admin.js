import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Admin.css";
import ItemAdminView from "./ItemAdminView";
import UserAdminView from "./UserAdminView";
import OrderAdminView from "./OrderAdminView";
import { loadItems, deleteItem } from "../../redux/actions/itemActions";
import { loadUsers, deleteUser } from "../../redux/actions/userActions";
import { loadOrders } from "../../redux/actions/orderActions";
import Swal from "sweetalert2";

const Admin = ({
  loadItems,
  deleteItem,
  loadUsers,
  deleteUser,
  loadOrders,
}) => {
  const [toggleState, setToggleState] = useState(1);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await loadItems();
      setItems(fetchedItems.data.data);
    };
    fetchItems();
  }, [loadItems]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await loadUsers();
      setUsers(fetchedUsers.data.data);
    };
    fetchUsers();
  }, [loadUsers]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await loadOrders();
      setOrders(fetchedOrders.data.data);
      console.log(fetchedOrders.data.data);
    };
    fetchOrders();
  }, [loadOrders]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const removeItem = async (id) => {
    const item = await deleteItem(id);
    console.log(item);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item removed successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    const items = await loadItems();
    setItems(items);
    setTimeout(() => {
      window.location.reload(false);
    }, 0);
  };

  const removeUser = async (id) => {
    const user = await deleteUser(id);
    console.log(user);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User removed successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    const users = await loadItems();
    setUsers(users);
    setTimeout(() => {
      window.location.reload(false);
    }, 1);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Item
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          User
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Order
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <ItemAdminView items={items} removeItem={removeItem} />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <UserAdminView
            users={users}
            removeUser={removeUser}
            loadUsers={loadUsers}
          />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <OrderAdminView orders={orders} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(loadItems()),
    deleteItem: (id) => dispatch(deleteItem(id)),
    loadUsers: () => dispatch(loadUsers()),
    deleteUser: (id) => dispatch(deleteUser(id)),
    loadOrders: () => dispatch(loadOrders()),
  };
};

export default connect(null, mapDispatchToProps)(Admin);
