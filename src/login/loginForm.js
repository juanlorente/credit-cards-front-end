import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';

const LoginForm = (props) => {
    return (
      <div className="colspan-12 center-block login-form-container">
        <Form horizontal bsClass="login-form form">
          <FormGroup controlId="username">
            <Col componentClass={ControlLabel} xs={3}>
              Username
            </Col>
            <Col xs={9}>
              <FormControl type="text" value={props.username} onChange={props.onUsernameChange} bsClass="login-textbox form-control" />
            </Col>
          </FormGroup>
          <FormGroup controlId="password">
            <Col componentClass={ControlLabel} xs={3}>
              Password
            </Col>
            <Col xs={9}>
              <FormControl type="password" value={props.password} onChange={props.onPasswordChange} bsClass="login-textbox form-control" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xsOffset={3} xs={9}>
              <Button type="submit" onClick={props.onSubmit} bsClass="login-submit-button btn">
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired
};

export default LoginForm;
