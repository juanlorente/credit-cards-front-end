import React from 'react';
import PropTypes from 'prop-types';
import Message from '../message';
import { FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

const TextInput = ({inputClass, controlId, validationState, labelCol, controlType,
                    inputCol, inputValue, labelValue, onChange, errorMessages}) => {
  const classValue = inputClass ? inputClass + " form-control" : "form-control";
  return (
    <FormGroup controlId={controlId} validationState={validationState}>
      <Col componentClass={ControlLabel} xs={labelCol}>
        {labelValue}
      </Col>
      <Col xs={inputCol}>
        <div className={inputClass}>
          <FormControl type={controlType} value={inputValue} onChange={onChange} />
          <Message messages={errorMessages} isVisible={validationState === 'error'} state="error" />
        </div>
      </Col>
    </FormGroup>
  );
};

TextInput.propTypes = {
  controlId: PropTypes.string.isRequired,
  validationState: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  labelValue: PropTypes.string.isRequired,
  controlType: PropTypes.string.isRequired,
  labelCol: PropTypes.number.isRequired,
  inputCol: PropTypes.number.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  inputClass: PropTypes.string
};

export default TextInput;
