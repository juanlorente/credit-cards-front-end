import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './actions';
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
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
  }

  onUsernameChanged(event) {
    this.setState({ username: event.target.value, usernameValidationState: null });
  }

  onPasswordChanged(event) {
    this.setState({ password: event.target.value, passwordValidationState: null });
  }

  onLoginClick(event) {
    event.preventDefault();
    if(this.isFormValid()){
      this.setState({isInvalidCredentials: false, pageErrorMessages: []});
      apiClient.callCreditCardsApi(CONSTANTS.HTTP_METHODS.POST, '/authenticate', (response) => {
        if(response.status === CONSTANTS.HTTP_STATUS_CODES.OK) {
          this.props.onLoginSuccess(response.data.token, {username: response.data.user.userName});
          sessionStorage.setItem(CONSTANTS.LOCAL_STORAGE.SESSION_KEY, JSON.stringify({
            id: response.data.token,
            user: { username: response.data.user.userName }
          }));
          this.setState({ isLoginSuccessful: true });
        }
        else if(response.status === CONSTANTS.HTTP_STATUS_CODES.INVALID_AUTHENTICATION) {
          this.setState({isInvalidCredentials: true, pageErrorMessages: ['Invalid Credentials']});
        }
      }, { userName: this.state.username, password: this.state.password });
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
        <LoginForm username={this.state.username} password={this.state.password}
          onUsernameChange={this.onUsernameChanged} onPasswordChange={this.onPasswordChanged}
          onSubmit={this.onLoginClick} usernameValidationState={this.state.usernameValidationState}
          passwordValidationState={this.state.passwordValidationState} usernameErrorMessages={this.state.usernameErrorMessages}
          passwordErrorMessages={this.state.passwordErrorMessages} isInvalidCredentials={this.state.isInvalidCredentials}
          pageErrorMessages={this.state.pageErrorMessages} />
      ) : (
        <Redirect to={this.state.from}/>
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

LoginContainer.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  onLoginSuccess: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(LoginContainer);