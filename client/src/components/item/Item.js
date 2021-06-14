import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/itemActions";
import "./Item.css";

const Item = ({ id, imageUrl, name, price, addToCart, type }) => {
  console.log("id", id);
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{name}</h3>
        </div>
        <div className="card-body">
          <h5>{type}</h5>
          <br />
          <p>$ {price}</p>
        </div>
      </div>
      <div className="btn">
        <button onClick={() => addToCart(id)}>Add to cart</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
