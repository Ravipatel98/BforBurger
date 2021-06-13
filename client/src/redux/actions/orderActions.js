import * as types from "./actionTypes";
import * as orderApi from "../apis/orderApis";

export const checkoutSuccess = (order) => {
  return {
    type: types.CHECKOUT,
    order,
  };
};

export const loadOrdersSuccess = (orders) => {
  return {
    type: types.LOAD_ORDERS,
    orders,
  };
};

export const updateOrderSuccess = (order) => {
  return {
    type: types.UPDATE_ORDER,
    order,
  };
};

export const checkout = (orderDetails) => {
  return async (dispatch) => {
    try {
      const order = await orderApi.checkout(orderDetails);
      dispatch(checkoutSuccess(order));
      return order;
    } catch (error) {
      return error;
    }
  };
};

export const loadOrders = () => {
  return async (dispatch) => {
    try {
      const orders = await orderApi.loadOrders();
      dispatch(loadOrdersSuccess(orders));
      console.log("action", orders);
      return orders;
    } catch (error) {
      return error;
    }
  };
};

export const updateOrder = (orderDetails) => {
  return async (dispatch) => {
    try {
      const order = await orderApi.updateOrder(orderDetails);
      dispatch(updateOrderSuccess(order));
      return order;
    } catch (error) {
      return error;
    }
  };
};
