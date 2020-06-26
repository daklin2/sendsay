import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  BUTTON_ACTIVITY_SWITCH,
  SET_ALERT_MESSAGE,
  SET_BUTTON_STATE
} from '../types/action.types'

export const setUserData = (login, subLogin, password) => ({
  type: SET_USER_DATA,
  payload: {
    login,
    subLogin,
    password,
  },
});

export const removeUserData = () => ({
  type: REMOVE_USER_DATA,
});

export const setAlertMessage = (message) => ({
  type: SET_ALERT_MESSAGE,
  payload: {
    message,
  }
})
