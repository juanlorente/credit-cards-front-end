import React from 'react';
import PropTypes from 'prop-types';
import Message from '../message';
import { FormGroup, Col, Checkbox } from 'react-bootstrap';

const CheckBox = ({controlId, columnProps, isChecked, labelValue, checkboxProps,
                    validationState, onChange, errorMessages}) => {
  return (
    <FormGroup controlId={controlId} validationState={validationState}>
      <Col {...columnProps}>
        <Checkbox onChange={onChange} checked={isChecked} {...checkboxProps}>
          {labelValue}
        </Checkbox>
        <Message messages={errorMessages} isVisible={validationState === 'error'} state="error" />
      </Col>
  </FormGroup>
  );
};

CheckBox.propTypes = {
  controlId: PropTypes.string.isRequired,
  validationState: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  labelValue: PropTypes.string.isRequired,
  columnProps: PropTypes.object.isRequired,
  checkboxProps: PropTypes.object,
  errorMessages: PropTypes.arrayOf(PropTypes.string)
};

export default CheckBox;
