import React, { useState, useEffect } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import DataTable from "../datatable/DataTable";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateItemDetails, loadItems } from "../../redux/actions/itemActions";
import "./Admin.css";

const ItemAdminView = ({ items, updateItemDetails, loadItems, removeItem }) => {
  const [q, setQ] = useState("");

  const filterRows = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  };

  const onEdit = (item) => {
    console.log(item);
    const selectedItem = {
      _id: item._id,
      name: item.name,
      type: item.type,
      timeToPrep: item.timeToPrep,
    };
    updateItemDetails(selectedItem);
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
        <Link to="/admin/addItem">
          <FaPlus size={23} onClick style={{ color: "#000" }} />
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Preparation Time</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            filterRows(items).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.timeToPrep}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                <td>
                  <Link to="/admin/updateItem">
                    <FaPen
                      style={{ margin: "3px 5px", color: "#000" }}
                      onClick={() => onEdit(item)}
                    />
                  </Link>
                  <FaTrash
                    style={{ margin: "3px 5px" }}
                    onClick={() => removeItem(item._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No items found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => dispatch(loadItems()),
    updateItemDetails: (item) => dispatch(updateItemDetails(item)),
  };
};

export default connect(null, mapDispatchToProps)(ItemAdminView);
