import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from './login/actions';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "username"
    };
  }

  componentWillMount() {
    console.log('about to mount home component');
    axios.get('http://dev.creditcards.schnin.biz/api/users/profile', {headers: {'credit-cards-authentication': this.props.sessionId}})
      .then((response) => {
        this.setState({ username: response.data.user.firstName });
      }).catch(error => {
        console.log('get user data call failed');
        this.props.onUnauthorized();
      });
  }

  render()
  {
    return (
      <h1>Hello {this.state.username}. This is the home page</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionId: state.session.sessionId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUnauthorized: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
