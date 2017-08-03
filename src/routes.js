import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './home';
import NotFound from './shared/notFound';
import LoginContainer from './login/loginContainer';
import PrivateRoute from './shared/privateRoute';

// TODO: extract set title functionality into shared utility
export default (store) => {
  return(
    <main className="row">
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <PrivateRoute routeArgs={{path:"/"}} path="/" component={Home} />
        <Route path="*" component={NotFound} status={404} />
      </Switch>
    </main>
  );
};
