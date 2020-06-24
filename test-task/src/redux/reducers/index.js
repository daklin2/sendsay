import { combineReducers } from 'redux';

import authReducer from './auth.reducer';

const reducer = combineReducers(authReducer);

export default reducer;
