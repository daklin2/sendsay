import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = ({ auth: {userAuth}}) => ({
  userAuth,
});

export default connect(mapStateToProps)(App);
