import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppWithRoutes from './AppWithRouter';
import Authorization from './Authorization';

const App = ({ userAuth }) => {
  const PageRoutes = userAuth ? <AppWithRoutes /> : <Authorization />;

  return (
    <>
      <BrowserRouter>
        {PageRoutes}
      </BrowserRouter>
    </>
  );
};

App.defaultProps = {
  userAuth: null,
};

App.propTypes = {
  userAuth: PropTypes.objectOf(PropTypes.object),
};

export default App;
