import burderBuilderReducer from './burgerBuilderReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    burgerBuilder:burderBuilderReducer,
    orders:orderReducer,
    auth:authReducer
})
export default rootReducer;