import React from "react";
import classes from "./Button.module.css";
//
const button = props => {
    // console.log('button is disabled? : ',props.disabled)
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;

