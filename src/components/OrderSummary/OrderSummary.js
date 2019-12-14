import React from 'react'
import Aux from '../../hoc/Auxiliary/auxiliary';
import Button from '../UI/Button/Button';
import PropTypes from 'prop-types';

const orderSummary = props => {
  const ingredientList = Object.keys(props.ingredients).map(ingKey => {
    return (
      <li key={ingKey}>
        <span style={{textTransform:"capitalize"}}>{ingKey}</span>: {props.ingredients[ingKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientList}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.orderCancelled} btnType="Danger">Cancel</Button>
      <Button clicked={props.orderContinued} btnType="Success">Continue</Button>
    </Aux>
  );
};

orderSummary.propTypes = {
  orderCancelled:PropTypes.func,
  orderContinued:PropTypes.func,
  price:PropTypes.number,
  ingredients:PropTypes.object
}


export default orderSummary;
