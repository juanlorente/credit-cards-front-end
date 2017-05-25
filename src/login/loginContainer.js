import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './loginForm';
import apiClient from '../api/apiClient';
import axios from 'axios';
import CONSTANTS from '../shared/constants';

class LoginContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      isLoginSuccessful: false
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
  }

  onUsernameChanged(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChanged(event) {
    this.setState({ password: event.target.value });
  }

  onLoginClick(event) {
    event.preventDefault();
    apiClient.callCreditCardsApi(CONSTANTS.HTTP_METHODS.POST, '/authenticate', (response) => {
      if(response.status === CONSTANTS.HTTP_STATUS_CODES.OK) {
        this.props.onLoginSuccess(response.data.token, {username: response.data.user.userName});
        sessionStorage.setItem(CONSTANTS.LOCAL_STORAGE.SESSION_KEY, JSON.stringify({
          id: response.data.token,
          user: { username: response.data.user.userName }
        }));
        this.setState({ isLoginSuccessful: true });
      }
    }, { userName: this.state.username, password: this.state.password });
  }

  render()
  {
    let redirect = { from: { pathname: '/' } };
    if(this.props.location.state && this.props.location.state.from) {
      redirect = this.props.location.state.from;
    }
    return (
      !this.state.isLoginSuccessful ? (
        <div>
        <LoginForm username={this.state.username} password={this.state.password}
          onUsernameChange={this.onUsernameChanged} onPasswordChange={this.onPasswordChanged}
          onSubmit={this.onLoginClick} />
        </div>
      ) : (
        <Redirect to={redirect}/>
      )
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginSuccess: (sessionId, user) => {
      dispatch(login(sessionId, user));
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginContainer);
