import { BUTTON_ACTIVITY_SWITCH, SET_BUTTON_STATE, LOAD_BUTTON_STATE } from '../types/action.types';

export const loadButtonState = (isLoad) => ({
  type: LOAD_BUTTON_STATE,
  payload: isLoad,
});

export const setButtonState = (state) => ({
  type: SET_BUTTON_STATE,
  payload: {
    state,
  },
});

export const buttonActivitySwitch = () => ({
  type: BUTTON_ACTIVITY_SWITCH,
});
