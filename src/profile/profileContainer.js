import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, PageHeader, Col, Row } from 'react-bootstrap';
import Button from '../shared/forms/button';
import Message from '../shared/message';
import apiClient from '../api/apiClient';
import CONSTANTS from '../shared/constants';
import Validators from '../shared/validators';
import TextInput from '../shared/forms/textInput';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      formFields: {
        username: {
          value: '',
          validationState: null,
          errorMessages: [],
          validators: [Validators.isRequired]
        },
        firstName: {
          value: '',
          validationState: null,
          errorMessages: [],
          validators: [Validators.isRequired]
        },
        lastName: {
          value: '',
          validationState: null,
          errorMessages: [],
          validators: [Validators.isRequired]
        },
        email: {
          value: '',
          validationState: null,
          errorMessages: [],
          validators: [Validators.isRequired, Validators.isEmail]
        }
      },
      pageMessages: [],
      pageState: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
  }

  componentWillMount() {
    apiClient.callCreditCardsApi(CONSTANTS.HTTP_METHODS.GET, '/users/profile', (response) => {
      let newState = Object.assign({}, this.state);
      for(let field in response.data.user) {
        newState.formFields[field].value = response.data.user[field];
      }
      this.setState(newState);
    });
  }

  onTextFieldChange(event) {
    let newState = Object.assign({}, this.state);
    newState.formFields[event.target.id].value = event.target.value;
    newState.formFields[event.target.id].validationState = null;
    this.setState(newState);
  }

  onSave() {
    event.preventDefault();
    this.setState({ pageState: '', pageMessages: [] });
    if(this.isFormValid()){
      apiClient.callCreditCardsApi(CONSTANTS.HTTP_METHODS.PUT, '/users', (response) => {
        if(response.status === CONSTANTS.HTTP_STATUS_CODES.OK) {
          this.setState({ pageState: 'success', pageMessages: ['Changes saved successfully'] });
        }
        else {
          // TODO: identify error scenarios
          this.setState({ pageState: 'error', pageMessages: ['An error occurred']});
        }
      }, { username: this.state.formFields.username.value, firstName: this.state.formFields.firstName.value,
              lastName: this.state.formFields.lastName.value, email: this.state.formFields.email.value });
    }
  }

  isFormValid() {
    let results = Validators.validateForm(this.state.formFields);
    this.setState({ formFields: results.formFields, pageState: results.isValid ? '' : 'error' });
    return results.isValid;
  }

  render()
  {
    const xsLabelCols = 3;
    const xsFieldCols = 9;
    const lgLabelCols = 2;
    const lgFieldCols = 10;
    return (
      <div>
        <PageHeader bsClass="credit-cards-page-header page-header">Profile</PageHeader>
        <Col xs={12}>
          <Row>
            <Col xs={xsLabelCols+4} lg={lgLabelCols+3}>
              <Message isPageMessage size={3} messages={this.state.pageMessages} state={this.state.pageState}
                isVisible={this.state.pageMessages && this.state.pageMessages.length > 0} />
            </Col>
          </Row>
        </Col>
        <Form horizontal onSubmit={this.onSave}>
          <TextInput controlId="username" field={this.state.formFields.username} labelColProps={{xs: xsLabelCols, lg: lgLabelCols}}
            inputColProps={{xs: xsFieldCols, lg: lgFieldCols}} onChange={this.onTextFieldChange} labelValue="Username" />
          <TextInput controlId="firstName" field={this.state.formFields.firstName} labelColProps={{xs: xsLabelCols, lg: lgLabelCols}}
            inputColProps={{xs: xsFieldCols, lg: lgFieldCols}} onChange={this.onTextFieldChange} labelValue="First Name" />
          <TextInput controlId="lastName" field={this.state.formFields.lastName} labelColProps={{xs: xsLabelCols, lg: lgLabelCols}}
            inputColProps={{xs: xsFieldCols, lg: lgFieldCols}} onChange={this.onTextFieldChange} labelValue="Last Name" />
          <TextInput controlId="email" field={this.state.formFields.email} labelColProps={{xs: xsLabelCols, lg: lgLabelCols}}
            inputColProps={{xs: xsFieldCols, lg: lgFieldCols}} onChange={this.onTextFieldChange} labelValue="Email" />
          <Button buttonType="submit"
                columnProps={{xsOffset: xsLabelCols, xs: xsFieldCols, lgOffset: lgLabelCols, lg: lgFieldCols}} textValue="Save" />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionId: state.session.sessionId
  };
};

export default connect(mapStateToProps)(ProfileContainer);
