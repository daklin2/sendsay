import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import consoleReducer from './console.reducer';
import buttonReducer from './button.reducer';

const reducer = combineReducers({
  auth: authReducer,
  console: consoleReducer,
  button: buttonReducer,
});

export default reducer;
