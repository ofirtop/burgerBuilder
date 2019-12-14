import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from '../../../axios';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        errorMessage:'',
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        errorMessage:'',
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        errorMessage:'',
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        errorMessage:'',
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail:true
        },
        valid: false,
        errorMessage:'',
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation:{},
        valid: true,
      }
    },
    formIsValid:false
  };

  orderHandler = e => {
    e.preventDefault();

    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId:this.props.userId
    };
    this.props.onOrderBurger(order,this.props.token);
  }


  checkValidity(value, rule,updatedElement) {
    let isValid = true;

    if (rule.required) {
      isValid = value.trim() !== "" && isValid;
      updatedElement.errorMessage = 'Please enter ' + updatedElement.elementConfig.placeholder;
    }

    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
      updatedElement.errorMessage = updatedElement.elementConfig.placeholder + ' should be at list ' + rule.minLength + ' letters long';
    }
    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
      updatedElement.errorMessage = updatedElement.elementConfig.placeholder + ' should be not more then ' + rule.maxLength + ' letters long';
    }

    if (rule.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = ev => {
    const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
    updatedOrderForm[ev.target.name].value = ev.target.value;
    
    updatedOrderForm[ev.target.name].valid = this.checkValidity(
      ev.target.value,
      updatedOrderForm[ev.target.name].validation,
      updatedOrderForm[ev.target.name]
    );
    
    updatedOrderForm[ev.target.name].touched = true;

    //setting the General validation of the form (formIsValid)
    let formIsValid = true;
    for(let key in updatedOrderForm){
      // console.log(key + ': ' + updatedOrderForm[key].valid)
      formIsValid = updatedOrderForm[key].valid && formIsValid
    }

    this.setState({ orderForm: updatedOrderForm ,formIsValid});
  };

  render() {
    const elementArray = [];
    for (let key in this.state.orderForm) {
      elementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    const elementsToShow = elementArray.map(element => {
      return (
        <Input
          key={element.id}
          name={element.id}
          invalid={!element.config.valid}
          errorMessage={element.config.errorMessage}
          touched={element.config.touched}
          shouldValidate={element.config.validation}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          changed={this.inputChangedHandler}
        />
      );
    });

    let form = <Spinner />;
    if (!this.props.loading) {
      // console.log('this.state.orderForm.formIsValid: ',this.state.formIsValid)
      form = (
        <form onSubmit={this.orderHandler}>
          {elementsToShow}
          <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    ingredients:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.orders.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onOrderBurger:(orderData,token)=>dispatch(actionCreators.purchaseBurger(orderData,token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
