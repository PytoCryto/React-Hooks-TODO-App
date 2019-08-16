import React from 'react';
import { Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';

export const AppRoute = ({ component: Component, ...rest }) => (
  <AppLayout>
    <Route render={props => <Component {...props} />} {...rest} />
  </AppLayout>
);
