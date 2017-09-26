import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginContainer from './login/loginContainer';
import Shop from './shop/shop';
import Merchants from './merchants/merchants';
import ProfileContainer from './profile/profileContainer';
import CreditCards from './creditCards/creditCards';
import Deals from './deals/deals';
import PrivateRoute from './shared/privateRoute';
import ErrorPage from './error/error';

const Routes = () => {
  return(
    <main className="row credit-cards-main-content">
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <PrivateRoute path="/profile" component={ProfileContainer} />
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