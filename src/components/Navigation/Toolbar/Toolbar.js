import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Hamburger from '../SideDrawer/Hamburger/Hamburger';

const toolbar = props => (
  <header className={classes.Toolbar} >
    <Hamburger openSideDrawer={props.openSideDrawer} />
    <div className={classes.Logo} >
      <Logo  />
    </div>
    <nav className={classes.DesktopOnly}>      
      <NavigationItems isAuth={props.isAuthenticated}/>
    </nav>
  </header>
);

export default toolbar;
