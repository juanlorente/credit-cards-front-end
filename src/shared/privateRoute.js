import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../login/actions';
import CONSTANTS from './constants';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPersistedSession: false
    };
  }

  componentWillMount() {
    if(!this.props.sessionId) {
      let persistedSession = JSON.parse(sessionStorage.getItem(CONSTANTS.LOCAL_STORAGE.SESSION_KEY));
      if(persistedSession) {
        this.props.loadPersistedSession(persistedSession.id, persistedSession.user);
        this.setState({ loadedPersistedSession : true });
      }
    }
  }

  componentWillReceiveProps() {
    this.setState({ loadedPersistedSession : false });
  }

  render() {
    return (
      (this.props.sessionId || this.state.loadedPersistedSession) ? (
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
  component: PropTypes.oneOf([PropTypes.element, PropTypes.func]).isRequired,
  routeArgs: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);