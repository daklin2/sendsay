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

  return new Sendsay({
    auth: {
      login: login,
      sublogin: subLogin,
      password: password,
    }
  })
}

const initialState = {
  userAuth: checkUserData(),
  getUserData: getCookie,
  buttonState: {
    isDisable: false,
    state: '--active',
  },
  authFail: false,
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_DATA:
      setCookie(LOGIN, payload.login);
      setCookie(SUB_LOGIN, payload.subLogin);
      setCookie(PASSWORD, payload.password);

      return {
        ...state,
        userAuth: {

        },
      }
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
    case SET_ALERT_MESSAGE:
      return {
        ...state,
        message: payload.message,
        authFail: true,
      }
    default:
      return {
        ...state,
      }
  }
}

export default authReducer
