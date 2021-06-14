import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateItem } from "../../redux/actions/itemActions";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateItem = ({ updateItem, itemDetails }) => {
  const [item, setItem] = useState({
    _id: "",
    name: "",
    price: 0,
    type: "",
    timeToPrep: 0,
  });
  const [file, setFile] = useState([]);

  const history = useHistory();

  useEffect(() => {
    console.log(itemDetails);
    setItem({
      _id: itemDetails._id,
      name: itemDetails.name,
      price: itemDetails.price,
      type: itemDetails.type,
      timeToPrep: itemDetails.timeToPrep,
    });
  }, [itemDetails]);

  const resetForm = () => {
    setItem({
      _id: "",
      name: "",
      price: 0,
      type: "",
      timeToPrep: 0,
    });
    setFile([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setFile([...file, e.target.files[0]]);
      console.log(e.target.files[0]);
    }
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("_id", item._id);
    formData.append("name", item.name);
    formData.append("price", item.price);
    formData.append("type", item.type);
    formData.append("timeToPrep", item.timeToPrep);
    const response = await updateItem(formData);
    console.log(response);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item updated successfully!",
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
    console.log(itemDetails);
    history.push("/admin");
    resetForm();
  };

  return (
    <div className="center">
      <h1>Update Item</h1>
      <form onSubmit={onSubmit}>
        <div className="txt_field">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={item.name}
            required
          />
          <span></span>
          <label htmlFor="name">Name</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            name="type"
            onChange={handleChange}
            value={item.type}
            required
          />
          <span></span>
          <label htmlFor="type">Type</label>
        </div>
        <div className="txt_field">
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={item.price}
            required
          />
          <span></span>
          <label>Price $</label>
        </div>
        <div className="txt_field">
          <input
            type="number"
            name="timeToPrep"
            onChange={handleChange}
            value={item.timeToPrep}
            required
          />
          <span></span>
          <label>Preparation time</label>
        </div>
        <div className="txt_field">
          <input
            type="file"
            name="file"
            // value={item.itemImage}
            onChange={handleChange}
          />
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

const mapStateToProps = (state) => {
  return {
    itemDetails: state.itemReducer.updateItemDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (item) => dispatch(updateItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItem);
