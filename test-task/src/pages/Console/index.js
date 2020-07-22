import { connect } from 'react-redux';

import Console from './Console';
import {
  clearQueriesHistory,
  setQueriesHistory,
} from '../../redux/actions/creators/console.creators';
import { loadButtonState } from '../../redux/actions/creators/button.creators';
import { removeUserData } from '../../redux/actions/creators/auth.creators';
import { LOGIN, SUB_LOGIN } from '../../constats/cookiesNames';
import fetchQuery from '../../middlewares/users/fetch-query';

const mapStateToProps = ({ auth: { getUserData, userAuth }, console: { historyQueries } }) => ({
  userAuth,
  historyQueries,
  userLogin: getUserData(LOGIN),
  userSubLogin: getUserData(SUB_LOGIN),
});

const mapToDispatch = (dispatch) => ({
  logout: () => dispatch(removeUserData()),
  fetchQuery: (user, request) => fetchQuery(user, request),
  buttonLoad: (state) => dispatch(loadButtonState(state)),
  setQueries: (query) => dispatch(setQueriesHistory(query)),
  clearQuery: () => dispatch(clearQueriesHistory()),
});

export default connect(mapStateToProps, mapToDispatch)(Console);
