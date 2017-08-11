import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import PubSub from 'pubsub-js';
import routes from './routes';
import './stylesheets/main.scss';
import session from './shared/sessionReducers';
import Title from './shared/title';
import NavMenu from './shared/navMenu';
import axios from 'axios';
import CONSTANTS from './shared/constants';
import { logout } from './login/actions';
import { Grid } from 'react-bootstrap';

const history = createHistory();
const reducers = combineReducers({ session });
const store = createStore(reducers);

axios.interceptors.request.use((config) => {
  config.headers = { [CONSTANTS.AUTHENTICATION_HEADER] : store.getState().session.sessionId };
  return config;
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if(error.response.status === 401) {
    PubSub.publish(CONSTANTS.PUB_SUB.LOGOUT);
  }
  return Promise.reject(error);
});

PubSub.subscribe(CONSTANTS.PUB_SUB.LOGOUT, () => {
  store.dispatch(logout());
  sessionStorage.removeItem(CONSTANTS.LOCAL_STORAGE.SESSION_KEY);
  localStorage.removeItem(CONSTANTS.LOCAL_STORAGE.REMEMBER_ME_KEY);
  history.push('/login');
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Grid>
        <Title />
        <Route path="/" component={NavMenu} />
        {routes()}
      </Grid>
    </Router>
  </Provider>,
  document.getElementById('app')
);