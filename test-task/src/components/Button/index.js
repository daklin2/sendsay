import { connect } from 'react-redux';

import Button from './Button';
import { LOAD } from '../../constats/buttonState';

const mapStateToProps = ({ button: { buttonState } }) => ({
  isDisable: buttonState.isDisable,
  buttonState: buttonState.state,
  buttonLoadClass: LOAD,
});

export default connect(mapStateToProps)(Button);
