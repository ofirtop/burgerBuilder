import React from "react";
import classes from "./Order.module.css";

const Order = props => {

  let ingredientList = [];
  if (props.ingredients) {
    for (let ingredient in props.ingredients) {
      ingredientList.push([ingredient, props.ingredients[ingredient]]);
    }
  }
  let ingredients = ingredientList.length
    ? ingredientList.map((ingredient,index) => {
        return (
          <li key={index} style={{textTransform:'capitalize'}}>
            {ingredient[0]} ({ingredient[1]})
          </li>
        );
      })
    : null;
  return (
    <div className={classes.Order}>
      <p>Ingredients</p>
      <ul>{ingredients}</ul>
      <p>
        Price: <strong>{(+props.price).toFixed(2)} USD</strong>
      </p>
    </div>
  );
};
export default Order;
