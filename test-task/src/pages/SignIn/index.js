import { connect } from 'react-redux';

import SignInPage from './SignInPage';
import signIn from '../../middlewares/users/sign-in';
import { ACTIVE } from '../../constats/buttonState';
import { buttonActivitySwitch, setButtonState } from '../../redux/actions/creators/button.creators';

const mapStateToProps = ({ auth: { message }, button: { buttonState } }) => ({
  buttonState,
  message,
  activeButtonState: ACTIVE,
});

const mapToDispatch = (dispatch) => ({
  sign: (login, subLogin, password) => signIn(login, subLogin, password, dispatch),
  switchButton: () => dispatch(buttonActivitySwitch()),
  setButtonState: (state) => dispatch(setButtonState(state)),
});

export default connect(mapStateToProps, mapToDispatch)(SignInPage);
