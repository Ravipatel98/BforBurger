import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeFromCart } from "../../redux/actions/itemActions";
import { checkout } from "../../redux/actions/orderActions";
import "./CartView.css";
import CartItem from "./CartItem";
import Paypal from "./Paypal";
import Swal from "sweetalert2";

const CartView = ({ cart, loggedInUser, checkout, removeFromCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const history = useHistory();

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      console.log(item);
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const transactionSuccess = async (data) => {
    console.log(loggedInUser);
    let orderDetails = {
      cartDetails: cart,
      user: loggedInUser.data.user,
      paymentData: data,
      totalAmount: totalPrice,
    };
    console.log("orderDetails", orderDetails);
    const response = await checkout(orderDetails);
    cart.forEach(async (cartItem) => {
      await removeFromCart(cartItem._id);
    });
    history.push("/items");
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order Placed successfully!",
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

  const transactionError = () => {};

  const transactionCancelled = () => {};

  return (
    <div className="cart__cart">
      <div className="cart__items">
        {cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
      <div className="cart__summary">
        <h4 className="summary__title">Cart Summary</h4>
        <div className="styles.summary__price">
          <span>TOTAL:({totalItems} items) </span>
          <span> ${totalPrice}</span>
        </div>
        {totalPrice > 0 && (
          <Paypal
            amount={totalPrice}
            onSuccess={transactionSuccess}
            onError={transactionError}
            onCancel={transactionCancelled}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.itemReducer.cart,
    loggedInUser: state.authReducer.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: (order) => dispatch(checkout(order)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
