import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, Button as RbButton } from 'react-bootstrap';

const Button = ({columnProps, textValue, buttonType, buttonProps, onClick}) => {
  return (
    <FormGroup>
    <Col {...columnProps}>
      <RbButton {...buttonProps} onClick={onClick} bsClass="login-submit-button btn">
        {textValue}
      </RbButton>
    </Col>
  </FormGroup>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  textValue: PropTypes.string.isRequired,
  columnProps: PropTypes.object.isRequired,
  buttonProps: PropTypes.object,
  buttonType: PropTypes.string.isRequired
};

export default Button;
