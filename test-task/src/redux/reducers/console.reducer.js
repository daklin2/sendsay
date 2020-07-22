import { QUERIES } from '../../constats/localStorageNames';
import { getStorage, setStorage } from '../../helpers/localStorage-utils';
import {
  CLEAR_QUERIES_HISTORY,
  DELETE_QUERIES_HISTORY,
  SET_QUERIES_HISTORY,
} from '../actions/types/action.types';

const getHistoryQueries = () => {
  const queries = getStorage(QUERIES) && getStorage(QUERIES).split(',');

  if (!queries) {
    return [];
  }
  return [...JSON.parse(queries)];
};

const checkQueryForUnique = (allQueries, currentQuery) => {
  return allQueries.findIndex(
    (el) => JSON.stringify(el.query) === JSON.stringify(currentQuery.query)
  );
};

const initialState = {
  historyQueries: getHistoryQueries(),
};

const consoleReducer = (state = initialState, { type, payload }) => {
  const queries = [...state.historyQueries];
  const indexOfQuery = () => checkQueryForUnique(state.historyQueries, payload);

  switch (type) {
    case SET_QUERIES_HISTORY:
      if (indexOfQuery() === -1) {
        queries.unshift(payload);
      } else {
        queries.unshift(...queries.splice(indexOfQuery(), 1));
      }

      setStorage(QUERIES, queries);
      return {
        ...state,
        historyQueries: queries,
      };
    case DELETE_QUERIES_HISTORY:
      queries.splice(payload, 1);

      setStorage(QUERIES, queries);
      return {
        ...state,
        historyQueries: queries,
      };
    case CLEAR_QUERIES_HISTORY:
      queries.length = 0;

      setStorage(QUERIES, queries);
      return {
        ...state,
        historyQueries: queries,
      };
    default:
      return {
        ...state,
      };
  }
};

export default consoleReducer;
