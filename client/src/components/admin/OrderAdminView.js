import React, { useState } from "react";
import "./Admin.css";

const OrderAdminView = ({ orders }) => {
  const [q, setQ] = useState("");

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
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Purchase Amount</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders
              .filter((order) => {
                if (q === "") {
                  return order;
                } else if (
                  order.user[0].userName
                    .toLowerCase()
                    .includes(q.toLocaleLowerCase())
                ) {
                  return order;
                } else if (
                  order.status.toLowerCase().includes(q.toLocaleLowerCase())
                ) {
                  return order;
                }
              })
              .map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.user[0].userName}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    {order.status[0].toUpperCase() + order.status.slice(1)}
                  </td>
                  <td>{order.createdAt}</td>
                  <td>{order.updatedAt}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="7">No orders found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default OrderAdminView;
