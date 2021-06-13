import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadOrders, updateOrder } from "../../redux/actions/orderActions";
import Order from "./Order";
import "./KitchenView.css";
import Swal from "sweetalert2";

const KitchenView = ({ loadOrders, loggedInUser, updateOrder }) => {
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statuses = [
    { id: 1, status: "Placed" },
    { id: 2, status: "Preparing" },
    { id: 3, status: "Delivered" },
    { id: 4, status: "All" },
  ];

  const generateOrdersByStatus = (status) => {
    let filteredOrder = [];
    if (
      status === "Placed" ||
      status === "Preparing" ||
      status === "Delivered"
    ) {
      console.log("status", status);
      filteredOrder = orders.filter(
        (orderDetails) =>
          orderDetails.status.toLowerCase() === status.toLowerCase()
      );
      console.log(filteredOrder);
    } else {
      filteredOrder = orders;
    }
    setFilterOrders(filteredOrder);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "selectedStatus") {
      setSelectedStatus(value);
      generateOrdersByStatus(value);
    }
    // const { task } = this.state;
    // task[name] = value;
    // this.setState({ task });
  };

  const fetchOrders = async () => {
    try {
      const response = await loadOrders();
      if (response && response.data && response.data.data) {
        setOrders(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    generateOrdersByStatus(selectedStatus);
  }, [orders]);

  const statusOptions = statuses.map((status) => (
    <option key={status.id} value={status.status}>
      {status.status} Orders
    </option>
  ));

  const updateOrderStatus = async (order) => {
    // console.log(order.target.value);
    if (order.status === "placed") {
      order.status = "preparing";
    } else if (order.status === "preparing") {
      order.status = "delivered";
    }
    console.log(updateOrder);
    const response = await updateOrder(order);
    fetchOrders();
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status changed successfully!",
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
    console.log(response);
  };

  return (
    <>
      <select
        className="item-searchbar"
        value={selectedStatus}
        name="selectedStatus"
        onChange={handleChange}
      >
        {statusOptions}
      </select>
      <div className="kitchen-container">
        {filterOrders.length > 0 ? (
          filterOrders.map((order, index) => (
            <Order
              key={index}
              user={loggedInUser}
              order={order}
              updateOrderStatus={updateOrderStatus}
            />
          ))
        ) : (
          <h2>Great! There is nothing to work</h2>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.authReducer.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: () => dispatch(loadOrders()),
    updateOrder: (orderDetails) => dispatch(updateOrder(orderDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KitchenView);
