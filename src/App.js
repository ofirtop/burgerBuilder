import React, {Component} from "react";
import Layout from "./hoc/Layout/layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route , Switch, Redirect} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});



class App extends Component {
  componentDidMount(){
    this.props.onAutoLogin();    
  }
  render(){
      let routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} exact />
          <Redirect to="/"/>
        </Switch>
      )
      if(this.props.isAuthenticated){
        routes = (
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />          
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" component={BurgerBuilder} exact />
            <Redirect to="/"/>
          </Switch>
        ) 
      }
    return (
      <BrowserRouter>
        <Layout>
          {routes}          
        </Layout>
      </BrowserRouter>
    );
  }  
}
const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}
const mapDispatchToProps = dispatch =>{
  
  return{
    onAutoLogin:()=>{dispatch(actions.tryAutoLogin())}    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
