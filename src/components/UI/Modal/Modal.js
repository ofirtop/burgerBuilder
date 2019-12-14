import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/auxiliary";
import Backdrop from "../Backdrop/Backdrop";

//The Modal class receives two props: show & clicked. 
//show: brings the modal to the center from above and also show the backdrop
//click: is receieved by the backdrop as a function that will close it when clicked
class modal extends Component {
  
  //Modal will update only when it is shown OR
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }
  render() {

    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default modal;
