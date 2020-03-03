import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Categories from './categories';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={match.url} component={Categories} />
    </Switch>
  </>
);

export default Routes;
