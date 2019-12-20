import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    loading:false,
    token:null,
    userId:null,
    error:null,
    authRedirectPath:'/'
}
const authReducer = (state=initialState,action)=>{

    const authStart = (state,action)=>{
        return updateObject(state,{loading:true,error:null})
    }
    const authSuccess = (state,action)=>{
        return updateObject(state,{
            loading:false,
            userId:action.userId,
            token:action.token,
            error:null
        })
    }
    const authFail = (state,action)=>{
        return updateObject(state,{
            loading:false,
            error:action.error       
        })
    }
    const authLogout = (state,action)=>{
        return updateObject(state,{userId:null,token:null})
    }

    const setAuthRedirectPath = (state,action)=>{
        return updateObject(state,{authRedirectPath:action.path})
    }

    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
}

export default authReducer