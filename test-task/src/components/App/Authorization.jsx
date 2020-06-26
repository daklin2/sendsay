import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';

import SignInPage from '../../pages/SignIn/';
import PATH from '../../constats/pathToPages';

const Authorization = () => (
  <Switch>
    <Route exact path={PATH.SIGN_IN} component={SignInPage} />
    <Redirect to={{ pathname: PATH.SIGN_IN }} />
  </Switch>
);

export default Authorization;
