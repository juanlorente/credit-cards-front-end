import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../login/actions';
import localforage from 'localforage';
import CONSTANTS from './constants';
import Spinner from './spinner';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loadedPersistedSession: false,
      hasRememberMeToken: false
    };
  }

  componentWillMount() {
    if(!this.props.sessionId) {
      let hasCurrentSession = JSON.parse(sessionStorage.getItem(CONSTANTS.LOCAL_STORAGE.SESSION_KEY));
      if(hasCurrentSession) {
        this.props.loadPersistedSession(hasCurrentSession.id, hasCurrentSession.user);
        this.setState({ loadedPersistedSession : true });
      }
      else {
        this.setState({ isLoading: true });
        localforage.getItem(CONSTANTS.LOCAL_STORAGE.REMEMBER_ME_KEY, (error, value) => {
          this.setState({ hasRememberMeToken: value, isLoading: false });
        });
      }
    }
  }

  componentWillReceiveProps() {
    this.setState({ loadedPersistedSession : false });
  }

  render() {
    return (
      (this.state.isLoading) ? <Spinner /> :
        (this.props.sessionId || this.state.loadedPersistedSession || this.state.hasRememberMeToken) ? (
          <Route {...this.props.routeArgs} component={this.props.component} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: this.props.location
          }}/>
        )
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
    loadPersistedSession: (sessionId, user) => {
      dispatch(login(sessionId, user));
    }
  };
};

PrivateRoute.propTypes = {
  sessionId: PropTypes.string,
  loadPersistedSession: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  routeArgs: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);