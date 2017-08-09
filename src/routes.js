import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './shared/notFound';
import LoginContainer from './login/loginContainer';
import Shop from './shop/shop';
import Merchants from './merchants/merchants';
import Profile from './profile/profile';
import CreditCards from './creditCards/creditCards';
import Deals from './deals/deals';
import PrivateRoute from './shared/privateRoute';

export default (store) => {
  return(
    <main className="row">
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/credit-cards" component={CreditCards} />
        <PrivateRoute path="/deals" component={Deals} />
        <PrivateRoute path="/merchants" component={Merchants} />
        <PrivateRoute path="/shop" component={Shop} />
        <Redirect from="/" to="/shop" />
        <Route path="*" component={NotFound} status={404} />
      </Switch>
    </main>
  );
};
