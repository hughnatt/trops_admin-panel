import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Adverts from './adverts';
import AdvertsDetail from './adverts-detail';
import AdvertsUpdate from './adverts-update';
import AdvertsDeleteDialog from './adverts-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AdvertsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AdvertsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AdvertsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Adverts} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AdvertsDeleteDialog} />
  </>
);

export default Routes;
