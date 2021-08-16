import loggedReducer from './isLogged';
import { combineReducers } from 'redux';

// Combine all the reducers together
const allReducers = combineReducers({
    isLogged: loggedReducer
})

export default allReducers;