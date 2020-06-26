import {BUTTON_ACTIVITY_SWITCH, SET_BUTTON_STATE} from "../types/action.types"

export const setButtonState = (state) => ({
  type: SET_BUTTON_STATE,
  payload: {
    state,
  }
});

export const buttonActivitySwitch = () => ({
  type: BUTTON_ACTIVITY_SWITCH,
});
