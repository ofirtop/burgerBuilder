import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import {Redirect} from 'react-router-dom'
import {checkValidity} from '../../shared/validation';

class Auth extends Component {
  state = {
    isSignup:false,
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
          autoComplete: "username"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        errorMessage: "",
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          autoComplete: "current-password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        errorMessage: "",
        touched: false
      }
    }
  };

  componentDidMount(){
    //This is an impossible scenario
    if(!this.props.building && this.props.authRedirectPath!=='/'){
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = ev => {
    const updatedAuthForm = JSON.parse(JSON.stringify(this.state.authForm));
    updatedAuthForm[ev.target.name].value = ev.target.value;

    updatedAuthForm[ev.target.name].valid = checkValidity(
      ev.target.value,
      updatedAuthForm[ev.target.name].validation,
      updatedAuthForm[ev.target.name]
    );

    updatedAuthForm[ev.target.name].touched = true;

    //setting the General validation of the form (formIsValid)
    // let formIsValid = true;
    // for(let key in updatedAuthForm){
    
    //   formIsValid = updatedAuthForm[key].valid && formIsValid
    // }

    this.setState({ authForm: updatedAuthForm /*,formIsValid*/ });
  };

  

  submitHandler = (ev) => {
    ev.preventDefault();
    this.props.onAuth(this.state.authForm.email.value,this.state.authForm.password.value,this.state.isSignup);
  };

  switchAuthModeHandler = () =>{
    this.setState(prevState=>{
      return { isSignup:!prevState.isSignup }
    })
  }

  render() {
    const elementArray = [];
    for (let key in this.state.authForm) {
      elementArray.push({
        id: key,
        config: this.state.authForm[key]
      });
    }

    let elementsToShow = elementArray.map(element => {
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

    if(this.props.loading){
      elementsToShow = <Spinner/>
    }

    let errorMessage = null;
    if(this.props.error){
      errorMessage = <p>{this.props.error}</p>
    }

    let redirect = null;
    if(this.props.isAuthenticated){
      redirect = <Redirect to={this.props.authRedirectPath} />
    }
    return (
      <div className={classes.Auth}>
        {redirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {elementsToShow}
          <Button btnType="Success" clicked={this.submitHandler}>{this.state.isSignup ? 'SignUp' :  'SignIn'}</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SignIn' :  'SignUp'}</Button>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    loading:state.auth.loading,
    error:state.auth.error,
    isAuthenticated:state.auth.token!=null,
    authRedirectPath:state.auth.authRedirectPath,
    building:state.burgerBuilder.building
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password,isSignup) => {dispatch(actions.auth(email, password, isSignup));},
    onSetAuthRedirectPath:()=>{dispatch(actions.setAuthRedirectPath('/'))}
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
