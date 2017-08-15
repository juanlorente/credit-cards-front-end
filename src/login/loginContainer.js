import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './loginForm';
import apiClient from '../api/apiClient';
import CONSTANTS from '../shared/constants';
import Validators from '../shared/validators';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      usernameValidationState: null,
      passwordValidationState: null,
      usernameErrorMessages: [],
      passwordErrorMessages: [],
      pageErrorMessages: [],
      isInvalidCredentials: false,
      isLoginSuccessful: false,
      from: props.location.state || { pathname: '/' }
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRememberMeChange = this.onRememberMeChange.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value, usernameValidationState: null });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value, passwordValidationState: null });
  }

  onRememberMeChange(event) {
    this.setState({ rememberMe: event.target.checked });
  }

  onLoginClick(event) {
    event.preventDefault();
    if(this.isFormValid()){
      this.setState({isInvalidCredentials: false, pageErrorMessages: []});
      apiClient.callCreditCardsApi(CONSTANTS.HTTP_METHODS.POST, '/authenticate', (response) => {
        if(response.status === CONSTANTS.HTTP_STATUS_CODES.OK) {
          if(this.state.rememberMe) {
            localStorage.setItem(CONSTANTS.LOCAL_STORAGE.REMEMBER_ME_KEY, 'true');
          }
          this.setState({ isLoginSuccessful: true });
        }
        else if(response.status === CONSTANTS.HTTP_STATUS_CODES.INVALID_AUTHENTICATION) {
          this.setState({isInvalidCredentials: true, pageErrorMessages: ['Invalid Credentials']});
        }
      }, { username: this.state.username, password: this.state.password, rememberMe: this.state.rememberMe });
    }
  }

  isFormValid() {
    const usernameIsValid = this.isUserNameValid();
    const passwordIsValid = this.isPasswordValid();
    return usernameIsValid && passwordIsValid;
  }

  isUserNameValid() {
    const usernameMessages = Validators.runValidators([Validators.isRequiredValidator],
      'Username', this.state.username);
    this.setState({usernameErrorMessages: usernameMessages,
      usernameValidationState: usernameMessages.length > 0 ? 'error' : null});
    return usernameMessages.length === 0;
  }

  isPasswordValid() {
    const passwordMessages = Validators.runValidators([Validators.isRequiredValidator],
      'Password', this.state.password);
    this.setState({passwordErrorMessages: passwordMessages,
      passwordValidationState: passwordMessages.length > 0 ? 'error' : null});
    return passwordMessages.length === 0;
  }

  render()
  {
    return (
      !this.state.isLoginSuccessful ? (
        <LoginForm onUsernameChange={this.onUsernameChange} onPasswordChange={this.onPasswordChange}
          onSubmit={this.onLoginClick} usernameValidationState={this.state.usernameValidationState}
          passwordValidationState={this.state.passwordValidationState} usernameErrorMessages={this.state.usernameErrorMessages}
          passwordErrorMessages={this.state.passwordErrorMessages} isInvalidCredentials={this.state.isInvalidCredentials}
          pageErrorMessages={this.state.pageErrorMessages} onRememberMeChange={this.onRememberMeChange} />
      ) : (
        <Redirect to={this.state.from}/>
      )
    );
  }
}

LoginContainer.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  })
};

export default LoginContainer;