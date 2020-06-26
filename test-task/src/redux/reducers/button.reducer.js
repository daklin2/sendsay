import {BUTTON_ACTIVITY_SWITCH, SET_BUTTON_STATE} from "../actions/types/action.types"

const initialState = {
  buttonState: {
    isDisable: false,
    state: '--active',
  },
}

const buttonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BUTTON_STATE:
      return {
        ...state,
        buttonState: {
          isDisable: state.buttonState.isDisable,
          state: payload.state,
        }
      }
    case BUTTON_ACTIVITY_SWITCH:
      return {
        ...state,
        buttonState: {
          isDisable: !state.buttonState.isDisable,
          state: state.buttonState.state,
        }
      }
    default:
      return {
        ...state,
      }
  }
}

export default buttonReducer;
