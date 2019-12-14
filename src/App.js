import React, {Component} from "react";
import Layout from "./hoc/Layout/layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route , Switch, Redirect} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount(){
    this.props.onAutoLogin();    
  }
  render(){
      let routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder} exact />
          <Redirect to="/"/>
        </Switch>
      )
      if(this.props.isAuthenticated){
        routes = (
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />          
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
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
