import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import routes from './routes';

export const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>{routes}</Router>
  </React.Fragment>
);
