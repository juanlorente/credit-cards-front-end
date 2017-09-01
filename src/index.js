import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import PubSub from 'pubsub-js';
import routes from './routes';
import './stylesheets/main.scss';
import session from './shared/sessionReducers';
import Title from './shared/title';
import NavMenu from './shared/navMenu';
import axios from 'axios';
import CONSTANTS from './shared/constants';
import { login, logout } from './login/actions';
import { Grid } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const history = createHistory();
const reducers = combineReducers({ session });
const middleware = process.env.NODE_ENV !== 'production' ?
  [require('redux-immutable-state-invariant').default()] :
  [];
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

axios.interceptors.request.use((config) => {
  config.headers = { [CONSTANTS.AUTHENTICATION_HEADER] : store.getState().session.sessionId };
  return config;
});

axios.interceptors.response.use((response) => {
  // save session info in store if new session created with request
  if(response.data.sessionToken && response.data.sessionUser) {
    sessionStorage.setItem(CONSTANTS.LOCAL_STORAGE.SESSION_KEY, JSON.stringify({
      id: response.data.sessionToken,
      user: { username: response.data.sessionUser.userName }
    }));
    store.dispatch(login(response.data.sessionToken, {username: response.data.sessionUser.userName}));
  }

  return response;
}, (error) => {
  if(error.response.status === CONSTANTS.HTTP_STATUS_CODES.INVALID_AUTHENTICATION) {
    PubSub.publish(CONSTANTS.PUB_SUB.LOGOUT);
  }
  // TODO: handle unauthorized requests more gracefully
  else {
    history.push('/error');
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
      <MuiThemeProvider>
        <Grid>
          <Title />
            <Route path="/" component={NavMenu} />
            {routes()}
        </Grid>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
);