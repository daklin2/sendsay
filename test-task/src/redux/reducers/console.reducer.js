import Sendsay from 'sendsay-api';

import { LOGIN, PASSWORD, SUB_LOGIN  } from '../../constats/cookiesNames';
import { clearAllCookie, getCookie, setCookie } from '../../helpers/cookies-utils';
import {
  SET_USER_DATA,
  BUTTON_ACTIVITY_SWITCH,
  SET_ALERT_MESSAGE,
  SET_BUTTON_STATE
} from '../actions/types/action.types'

const checkUserData = () => {
  const login = getCookie(LOGIN)
  const subLogin = getCookie(SUB_LOGIN)
  const password = getCookie(PASSWORD)

  if (!(login && password)) {
    clearAllCookie()
    return null
  }
}

const initialState = {
  buttonState: {
    isDisable: false,
    state: '--active',
  },
}

const consoleReducer = (state = initialState, {type, payload}) => {
  switch (type) {

    default:
      return {
        ...state,
      }
  }
}

export default consoleReducer;
