import {
  BUTTON_ACTIVITY_SWITCH,
  LOAD_BUTTON_STATE,
  SET_BUTTON_STATE,
} from '../actions/types/action.types';
import { ACTIVE, LOAD } from '../../constats/buttonState';

const initialState = {
  buttonState: {
    isDisable: false,
    state: ACTIVE,
  },
};

const buttonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BUTTON_STATE:
      return {
        ...state,
        buttonState: {
          isDisable: state.buttonState.isDisable,
          state: payload.state,
        },
      };
    case BUTTON_ACTIVITY_SWITCH:
      return {
        ...state,
        buttonState: {
          isDisable: !state.buttonState.isDisable,
          state: state.buttonState.state,
        },
      };
    case LOAD_BUTTON_STATE:
      return {
        ...state,
        buttonState: {
          isDisable: payload,
          state: payload ? LOAD : ACTIVE,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default buttonReducer;
