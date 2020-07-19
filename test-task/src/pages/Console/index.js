import { connect } from 'react-redux';

import Console from './Console';
import { buttonActivitySwitch, setButtonState } from '../../redux/actions/creators/button.creators';
import {ACTIVE, LOAD} from '../../constats/buttonState';
import { removeUserData } from '../../redux/actions/creators/auth.creators';
import { LOGIN, SUB_LOGIN } from '../../constats/cookiesNames';
import fetchQuery from '../../middlewares/users/fetch-query';

const mapStateToProps = ({ auth: { getUserData }, button: { buttonState }}) => ({
  userLogin: getUserData(LOGIN),
  userSubLogin: getUserData(SUB_LOGIN),
  buttonState,
  isLoad: LOAD,
  activeButtonState: ACTIVE,
});

const mapToDispatch = (dispatch) => ({
  logout: () => dispatch(removeUserData()),
  fetchQuery: () => fetchQuery(),
  switchButton: () => dispatch(buttonActivitySwitch()),
  setButtonState: (state) => dispatch(setButtonState(state)),

});

export default connect(mapStateToProps, mapToDispatch)(Console);
