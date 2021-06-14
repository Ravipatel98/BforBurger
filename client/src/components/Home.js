import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="left">
          <h6>
            <em>Are you hungry?</em>
            <h1>Don't wait!</h1>
            <Link to="/items">
              <button className="button">
                <span>Order Now</span>
              </button>
            </Link>
          </h6>
        </div>
        <div className="right">
          <img src="/images/home.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
