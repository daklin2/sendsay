import { connect } from 'react-redux';

import Authorization from './Authorization';
import { buttonActivitySwitch, setButtonState } from '../../redux/actions/creators/auth.creators';
import signIn from '../../middlewares/users/sign-in';
import {ACTIVE, LOAD} from '../../constats/buttonState'

const mapStateToProps = ({ auth: { buttonState, message }}) => ({
  buttonState,
  message,
  isLoad: LOAD,
  activeButtonState: ACTIVE,
});

const mapToDispatch = (dispatch) => ({
  sign: (login, subLogin, password) => signIn(login, subLogin, password, dispatch),
  switchButton: () => dispatch(buttonActivitySwitch()),
  setButtonState: (state) => dispatch(setButtonState(state))

});

export default connect(mapStateToProps, mapToDispatch)(Authorization);
