import React from "react";
import { connect } from "react-redux";
import { FaClipboard, FaClipboardList, FaClipboardCheck } from "react-icons/fa";
import { updateOrder } from "../../redux/actions/orderActions";
import "./Order.css";

const Order = ({ user, order, updateOrderStatus }) => {
  return (
    <div className="card-container">
      <div className="header-container">
        <h5>{`${order.user[0].userName}: ${order.user[0].id}`}</h5>
        <h5>{`OrderId: ${order._id}`}</h5>
      </div>
      <div className="card-content">
        <div className="card-title">
          <h4 style={{ display: "inline" }}>{`Order status: `}</h4>
          <span>{order.status[0].toUpperCase() + order.status.slice(1)}</span>
        </div>
        <div className="card-body">
          {order.product.map((item, index) => (
            <p key={index}>{`${item.name} x ${item.qty}`}</p>
          ))}
        </div>
      </div>
      <div
        className="btn"
        style={{ marginBottom: "10px ", cursor: "pointer" }}
        onClick={() => updateOrderStatus(order)}
      >
        {order.status === "placed" ? (
          <FaClipboard size={23} />
        ) : order.status === "preparing" ? (
          <FaClipboardList size={23} />
        ) : (
          <FaClipboardCheck size={23} />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrder: (orderDetails) => dispatch(updateOrder(orderDetails)),
  };
};

export default connect(null, mapDispatchToProps)(Order);
