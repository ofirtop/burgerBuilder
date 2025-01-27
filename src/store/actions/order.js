import * as actionTypes from "./actionsTypes";
import axios from "../../axios";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData,token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token,userId) => {
  return dispatch => {
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    dispatch(fetchOrdersStart());
    axios.get('/orders.json' + queryParams)
         .then(res => {
        // this.setState({ loading: false });
        let orderList = [];
        for (let key in res.data) {
          orderList.push({
            ...res.data[key],
            id: key
          });
        }        
        dispatch(fetchOrdersSuccess(orderList));
      })
      .catch(error => {
        dispatch(fetchOrderFail(error));
      });
  };
};
