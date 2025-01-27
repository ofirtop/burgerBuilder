import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
// import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    console.log('INSIDE CHEKCOUT - PROPS: ',this.props)
    let summaryToShow = <Redirect to="/" />;
    if (this.props.ingredients) {

      summaryToShow = this.props.purchased ? <Redirect to="/"/> : (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}/>
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summaryToShow ;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased:state.orders.purchased
  };
};
export default connect(mapStateToProps)(Checkout);
