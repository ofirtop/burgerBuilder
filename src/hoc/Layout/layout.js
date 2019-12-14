import React, { Component } from "react";
import Auxiliary from "../Auxiliary/auxiliary";
import classes from "./layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  
  openSideDrawerHandler =()=>{
      this.setState({showSideDrawer: true})
  }

  render() {
    return (
      <Auxiliary>                
        <Toolbar
            isAuthenticated={this.props.isAuth}
            openSideDrawer={this.openSideDrawerHandler}/>
        <SideDrawer 
            isAuthenticated={this.props.isAuth}
            showSideDrawer={this.state.showSideDrawer} 
            closeSideDrawer={this.closeSideDrawerHandler} />
        <main className={classes.content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}
const mapStateToProps = state =>{
  return {
    isAuth:state.auth.token!=null
  }
}
export default connect(mapStateToProps)(Layout);
