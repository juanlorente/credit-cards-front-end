import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import apiClient from '../api/apiClient';
import CONSTANTS from '../shared/constants';
import Validators from '../shared/validators';
import TextInput from '../shared/forms/textInput';
import CheckBox from '../shared/forms/checkBox';
import Button from '../shared/forms/button';
import Message from '../shared/message';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: {
        username: {
          value: '',
          validationState: null,
          errorMessages: [],
          validators: [Validators.isRequired]
        },
        password: {
          value: '',
          validationState: null,
          errorMessages: [],
          validators: [Validators.isRequired]
        },
        rememberMe: {
          value: false
        }
      },
      pageErrorMessages: [],
      isInvalidCredentials: false,
      isLoginSuccessful: false,
      from: props.location.state || { pathname: '/' }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.onRememberMeChange = this.onRememberMeChange.bind(this);
  }

  onTextFieldChange(event) {
    let newState = Object.assign({}, this.state);
    newState.formFields[event.target.id].value = event.target.value;
    newState.formFields[event.target.id].validationState = null;
    this.setState(newState);
  }

  onRememberMeChange(event) {
    let newState = Object.assign({}, this.state);
    newState.formFields.rememberMe.value = event.target.checked;
    this.setState(newState);
  }

  onSubmit(event) {
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
      }, { username: this.state.formFields.username.value, password: this.state.formFields.password.value,
              rememberMe: this.state.formFields.rememberMe.value });
    }
  }

  isFormValid() {
    let results = Validators.validateForm(this.state.formFields);
    this.setState(Object.assign({}, this.state, { formFields: results.formFields }));
    return results.isValid;
  }

  render()
  {
    return (
      !this.state.isLoginSuccessful ? (
        <div className="colspan-12 center-block login-form-container">
          <Message isPageMessage size={3} messages={this.state.pageErrorMessages} state="error"
            isVisible={this.state.isInvalidCredentials} />
          <Form horizontal>
            <TextInput controlId="username" field={this.state.formFields.username} labelColProps={{xs: 4}}
              inputColProps={{xs: 8}} onChange={this.onTextFieldChange} labelValue="Username" />
            <TextInput controlId="password" field={this.state.formFields.password} labelColProps={{xs: 4}}
              inputColProps={{xs: 8}} onChange={this.onTextFieldChange} labelValue="Password"
              controlType="password" />
            <CheckBox controlId="remember-me" columnProps={{xsOffset: 4, xs: 8}} onChange={this.onRememberMeChange}
              labelValue="Remember Me" />
            <Button buttonType="submit" onClick={this.onSubmit}
                  columnProps={{xsOffset:4, xs:8}} textValue="Sign In" />
          </Form>
        </div>
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