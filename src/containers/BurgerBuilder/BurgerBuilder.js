import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/auxiliary";
import Burger from "../../components/Burger/burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseMode: false
    };
  }

  componentDidMount(){
    this.props.onInitIngredients();
  }
  //When order button is clicked
  purchaseHandler = () => {
    if(this.props.isAuth){
      this.setState({ purchaseMode: true });
    }else{
      this.props.onSetAuthRedirectPath("/checkout")
      this.props.history.push("/auth")
    }
  };

  cancelOrderHandler = () => {
    this.setState({ purchaseMode: false });
  };
  continueOrderHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout')
  };

  isPurchasable = (ingredients) =>{
    let isPurchasable=false;
    for(let key in ingredients ){
      if(ingredients[key] > 0){
        isPurchasable = true;
        break;
      } 
    }
    return isPurchasable;
  }

  render() {
    let disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            enterOrderMode={this.purchaseHandler}
            purchasable={this.isPurchasable(this.props.ingredients)}
            isAuthenticated={this.props.isAuth}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          orderContinued={this.continueOrderHandler}
          orderCancelled={this.cancelOrderHandler}
        />
      );
    }

    // if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Auxiliary>
        <Modal show={this.state.purchaseMode} clicked={this.cancelOrderHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state =>{
  return{
   ingredients:state.burgerBuilder.ingredients ,
   totalPrice:state.burgerBuilder.totalPrice,
   error:state.burgerBuilder.error,
   isAuth:state.auth.token!=null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onIngredientAdded:(ingName)=>dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients:()=>dispatch(actionCreators.initIngredients()),
    onInitPurchase:()=>dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath:(path)=>dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
