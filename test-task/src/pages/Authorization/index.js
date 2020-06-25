import { connect } from 'react-redux';

import Authorization from './Authorization';
import signIn from '../../middlewares/users/sign-in';
import { removeUserData } from '../../redux/actions/creators/auth.creators';

const mapStateToProps = ({ auth }) => ({
  ...auth,
});

const mapToDispatch = () => ({
  signIn,
  removeUserData,
});

export default connect(mapStateToProps, mapToDispatch)(Authorization);
