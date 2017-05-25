import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import routes from './routes';
import './styles.css';
import session from './shared/sessionReducers';
import Title from './shared/title';

const reducers = combineReducers({ session });
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
      <Title />
      {routes(store)}
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
