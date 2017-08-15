import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../shared/forms/text-input';
import Message from '../shared/message';
import { Form, FormGroup, Col, Button, Checkbox } from 'react-bootstrap';

const LoginForm = ({usernameValidationState, passwordValidationState, onUsernameChange,
    onPasswordChange, onRememberMeChange, onSubmit, usernameErrorMessages,
    passwordErrorMessages, pageErrorMessages, isInvalidCredentials}) => {

  return (
    <div className="colspan-12 center-block login-form-container">
      <div>
        <Message isPageMessage size={3} messages={pageErrorMessages} state="error" isVisible={isInvalidCredentials} />
      </div>
      <Form horizontal>
        <TextInput controlId="username" validationState={usernameValidationState} labelCol={4}
          inputCol={8} onChange={onUsernameChange} errorMessages={usernameErrorMessages}
          labelValue="Username" controlType="text" />
        <TextInput controlId="password" validationState={passwordValidationState} labelCol={4}
          inputCol={8} onChange={onPasswordChange} errorMessages={passwordErrorMessages}
          labelValue="Password" controlType="password" />
        <FormGroup>
          <Col xsOffset={4} xs={8}>
            <Checkbox onChange={onRememberMeChange} bsClass="login-remember-me-checkbox checkbox">
              Remember Me
            </Checkbox>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xsOffset={4} xs={8}>
            <Button type="submit" onClick={onSubmit} bsClass="login-submit-button btn">
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onRememberMeChange: PropTypes.func.isRequired,
  usernameValidationState: PropTypes.string,
  passwordValidationState: PropTypes.string,
  usernameErrorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  passwordErrorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageErrorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  isInvalidCredentials: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
