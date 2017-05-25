import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../login/actions';
import CONSTANTS from './constants';

class PrivateRoute extends React.Component {
  constructor() {
    super();
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
    console.log('calling will receive props')
    this.setState({ loadedPersistedSession : false });
  }

  render() {
    return (
      (this.props.sessionId || this.state.loadedPersistedSession) ? (
        <Route {...this.props.routeArgs} component={this.props.component} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: this.props.location }
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
      console.log('loading persisted session');
      dispatch(login(sessionId, user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
