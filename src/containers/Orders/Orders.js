import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token,this.props.userId);
  }

  render() {
    let orderList = <Spinner />;
    if (!this.props.loading) {
      orderList = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }

    return <div>{orderList}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token:state.auth.token,
    userId:state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));
