import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppWithRoutes from './AppWithRouter';
import Authorization from './Authorization';

const App = ({ token }) => {
  const PageRoutes = token ? <AppWithRoutes /> : <Authorization />;

  return (
    <>
      <BrowserRouter>
        {PageRoutes}
      </BrowserRouter>
    </>
  );
};

App.defaultProps = {
  token: null,
};

App.propTypes = {
  token: PropTypes.string,
};

export default App;
