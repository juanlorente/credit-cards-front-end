import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiClient from '../api/apiClient';
import CONSTANTS from '../shared/constants';

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      username: "username"
    };
  }

  componentWillMount() {
    apiClient.callCreditCardsApi(CONSTANTS.HTTP_METHODS.GET, '/users/profile', (response) => {
        this.setState({ username: response.data.user.firstName });
      });
  }

  render()
  {
    return (
      <h1>Hello {this.state.username}. This is the shop page</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionId: state.session.sessionId
  };
};

export default connect(mapStateToProps)(Shop);
