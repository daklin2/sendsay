import {
  CLEAR_QUERIES_HISTORY,
  DELETE_QUERIES_HISTORY,
  SET_QUERIES_HISTORY,
} from '../types/action.types';

export const setQueriesHistory = (query) => ({
  type: SET_QUERIES_HISTORY,
  payload: query,
});

export const deleteQueriesHistory = (index) => ({
  type: DELETE_QUERIES_HISTORY,
  payload: index,
});

export const clearQueriesHistory = () => ({
  type: CLEAR_QUERIES_HISTORY,
  payload: null,
});
