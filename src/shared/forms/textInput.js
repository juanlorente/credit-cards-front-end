import React from 'react';
import PropTypes from 'prop-types';
import Message from '../message';
import { FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

const TextInput = ({controlId, field, labelColProps, controlType = "text",
                    inputColProps, labelValue, onChange}) => {
  return (
    <FormGroup controlId={controlId} validationState={field.validationState}>
      <Col componentClass={ControlLabel} {...labelColProps}>
        {labelValue}
      </Col>
      <Col {...inputColProps}>
          <FormControl type={controlType} value={field.value} onChange={onChange} />
          <Message messages={field.errorMessages} isVisible={field.validationState === 'error'} state="error" />
      </Col>
    </FormGroup>
  );
};

TextInput.propTypes = {
  controlId: PropTypes.string.isRequired,
  field: PropTypes.shape({
    value: PropTypes.string,
    errorMessages: PropTypes.arrayOf(PropTypes.string),
    validationState: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func,
  labelValue: PropTypes.string.isRequired,
  controlType: PropTypes.string,
  labelColProps: PropTypes.object.isRequired,
  inputColProps: PropTypes.object.isRequired
};

export default TextInput;
