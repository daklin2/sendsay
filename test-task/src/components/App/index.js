import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = () => ({
  token: '',
});

export default connect(mapStateToProps)(App);
