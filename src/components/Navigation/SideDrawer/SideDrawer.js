import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/auxiliary";

const SideDrawer = (props) => {
  const attachedClasses = props.showSideDrawer ? [classes.SideDrawer,classes.Open] : [classes.SideDrawer,classes.Close]

  return (
    <Aux>
      <Backdrop show={props.showSideDrawer} clicked={props.closeSideDrawer} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuthenticaetd} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
