import React from "react";
import "./Item.css";

const Item = ({ imageUrl, name, type }) => {
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
          <p>{type}</p>
        </div>
      </div>
      <div className="btn">
        <button>View More</button>
      </div>
    </div>
  );
};

export default Item;
