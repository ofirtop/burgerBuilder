import * as actionTypes from "./actionsTypes";
import axios from "axios";
import * as keys from '../../passwords';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
const checkAuthTimeout = timeout => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, timeout * 1000);
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};
//Authentication with the server - Either signIn or signUp
export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    /* async authentication code goes here... */
    const authData = { email, password, returnSecureToken: true };
    
    let url =      
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + keys.AUTH_KEY;
    if (!isSignup) {
      url =        
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + keys.AUTH_KEY;
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error.response.data.error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const tryAutoLogin = () => {
  return dispatch => {      
    const token = localStorage.getItem("token");
    if (!token) {        
      dispatch(authLogout());
    } else {      
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
      if (expiresIn > 0) {
        const userId = localStorage.getItem("userId");        
        dispatch(authSuccess(userId, token));
        dispatch(checkAuthTimeout(expiresIn));
      }else{

        dispatch(authLogout())        
      }
    }
  };
};
