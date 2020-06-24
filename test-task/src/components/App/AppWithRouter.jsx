import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Console from '../../pages/Console';
import PATH from '../../constats/pathToPages';

const AppWithRoutes = () => (
    <Switch>
      <Route exact path="/" component={() => <Redirect to={PATH.PATH_TO_CONSOLE} />} />
      <Route exact path={PATH.PATH_TO_CONSOLE} component={Console} />
      <Redirect to={{ pathname: PATH.PATH_TO_CONSOLE }} />
    </Switch>
);

export default AppWithRoutes;
