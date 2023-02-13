import {combineReducers} from 'redux';
import userDataReducer from './userDataReducer';
import tokenDataReducer from './tokenDataReducer';

const rootReducer = combineReducers({
    userDataReducer,
    tokenDataReducer
});

export default rootReducer;