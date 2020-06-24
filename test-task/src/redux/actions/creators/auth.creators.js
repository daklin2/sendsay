import {SET_USER_DATA, REMOVE_USER_DATA} from '../types/action.types';

export const setUserData = ({ token, userId, subLogin = '' }) => ({
  type: SET_USER_DATA,
  payload: { token, userId },
});

export const removeUserData = () => ({
  type: REMOVE_USER_DATA,
});
