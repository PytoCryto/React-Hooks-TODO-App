import React from 'react';
import { Switch } from 'react-router-dom';
import { AppRoute } from './routes/Route';
import TodoPage from './pages/TodoPage';

const PageNotFound = () => <div>404 Page not found.</div>;

export default (
  <Switch>
    <AppRoute path="/" exact component={TodoPage} />
    <AppRoute path="*" component={PageNotFound} status="404" />
  </Switch>
);
