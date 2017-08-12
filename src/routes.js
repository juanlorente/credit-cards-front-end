import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginContainer from './login/loginContainer';
import Shop from './shop/shop';
import Merchants from './merchants/merchants';
import Profile from './profile/profile';
import CreditCards from './creditCards/creditCards';
import Deals from './deals/deals';
import PrivateRoute from './shared/privateRoute';
import ErrorPage from './error/error';

const Routes = (store) => {
  return(
    <main className="row">
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/credit-cards" component={CreditCards} />
        <PrivateRoute path="/deals" component={Deals} />
        <PrivateRoute path="/merchants" component={Merchants} />
        <PrivateRoute path="/shop" component={Shop} />
        <Route path="/error" component={ErrorPage} />
        <Redirect from="/" exact to="/shop" />
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Routes;