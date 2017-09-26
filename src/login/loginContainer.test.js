import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import LoginContainer from './loginContainer';
import apiClient from '../api/apiClient';
import CONSTANTS from '../shared/constants';
import Validators from '../shared/validators';

const usernameField = 'username';
const passwordField = 'password';
const usernameValue = 'myUsername';
const passwordValue = 'myPassword';
const apiMethod = CONSTANTS.HTTP_METHODS.POST;
const apiUrl = '/authenticate';

describe('LoginContainer', () => {
  test('Initial render matches snapshot', () => {
    const tree = renderer.create(<LoginContainer location={new Object()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Invalid form submissions', () => {
    describe('With no username or password', () => {
      let wrapper;

      beforeAll(() => {
        Validators.validateForm = jest.fn(Validators.validateForm);
        wrapper = mount(<LoginContainer location={new Object()} />);
        wrapper.find('form').simulate('submit');
      });

      test('Calls ValidateForm', () => {
        expect(Validators.validateForm).toHaveBeenCalledTimes(1);
      });

      test('Shows error on username field', () => {
        assertFieldErrorState(usernameField, 1, wrapper);
      });

      test('Shows error on password field', () => {
        assertFieldErrorState(passwordField, 1, wrapper);
      });
    });

    describe('With username, but no password', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = mount(<LoginContainer location={new Object()} />);
        wrapper.find(`input#${usernameField}`).simulate('change',
          {target: {value: usernameValue, id: usernameField}});
        wrapper.find('form').simulate('submit');
      });

      test('Does not show error on username field', () => {
        assertFieldErrorState(usernameField, 0, wrapper);
      });

      test('Shows error on password field', () => {
        assertFieldErrorState(passwordField, 1, wrapper);
      });
    });

    describe('With password, but no username', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = mount(<LoginContainer location={new Object()} />);
        wrapper.find(`input#${passwordField}`).simulate('change',
          {target: {value: passwordValue, id: passwordField}});
        wrapper.find('form').simulate('submit');
      });

      test('Shows error on username field', () => {
        assertFieldErrorState(usernameField, 1, wrapper);
      });

      test('Does not show error on password field', () => {
        assertFieldErrorState(passwordField, 0, wrapper);
      });
    });
  });

  describe('Valid form submissions', () => {
    describe('Calls API client once with correct data', () => {
      let wrapper;

      beforeEach(() => {
        Validators.validateForm = jest.fn(Validators.validateForm);
        apiClient.callCreditCardsApi = jest.fn();
        wrapper = mount(<LoginContainer location={new Object()} />);
        wrapper.find(`input#${usernameField}`).simulate('change',
          {target: {value: usernameValue, id: usernameField}});
        wrapper.find(`input#${passwordField}`).simulate('change',
          {target: {value: passwordValue, id: passwordField}});
      });

      test('Without remember me', () => {
        wrapper.find('form').simulate('submit');
        expect(Validators.validateForm).toHaveBeenCalledTimes(1);
        expect(apiClient.callCreditCardsApi).toHaveBeenCalledTimes(1);
        expect(apiClient.callCreditCardsApi).toHaveBeenCalledWith(apiMethod, apiUrl, expect.any(Function), {
          username: usernameValue,
          password: passwordValue,
          rememberMe: false
        });
      });

      test('With remember me', () => {
        wrapper.find('input[type="checkbox"]').simulate('change',
          {target: {checked: true}});
        wrapper.find('form').simulate('submit');
        expect(Validators.validateForm).toHaveBeenCalledTimes(1);
        expect(apiClient.callCreditCardsApi).toHaveBeenCalledTimes(1);
        expect(apiClient.callCreditCardsApi).toHaveBeenCalledWith(apiMethod, apiUrl, expect.any(Function), {
          username: usernameValue,
          password: passwordValue,
          rememberMe: true
        });
      });
    });
  });
});

function assertFieldErrorState(fieldName, count, wrapper) {
  let field = wrapper.find(`.has-error input#${fieldName}`);
  expect(field).toHaveLength(count);
}