import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './loginForm';
import apiClient from '../api/apiClient';
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

  componentWillReceiveProps() {
    if(this.props.location.state && this.props.location.state.from) {
      this.setState({ redirect: this.props.location.state.from });
    }
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

  validateFormValues() {
    if(this.state.username && this.state.password) {
      return 'success';
    }
    else {
      return null;
    }
  }

  render()
  {
    const from = this.props.location.state || { pathname: '/' };
    return (
      !this.state.isLoginSuccessful ? (
        <LoginForm username={this.state.username} password={this.state.password}
          onUsernameChange={this.onUsernameChanged} onPasswordChange={this.onPasswordChanged}
          onSubmit={this.onLoginClick} validate={this.validateFormValues} />
      ) : (
        <Redirect to={from}/>
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