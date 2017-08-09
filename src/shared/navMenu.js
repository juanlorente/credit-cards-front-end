import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PubSub from 'pubsub-js';
import CONSTANTS from './constants';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: CONSTANTS.NAV_BAR.PATH_TO_KEY_MAP.get(this.props.location.pathname.split('/')[1])
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(eventKey) {
    if(this.state.activeKey !== eventKey) {
      this.setState({ activeKey: eventKey });
    }

    if(eventKey !== CONSTANTS.NAV_BAR.KEYS.LOGOUT) {
      this.props.history.push(CONSTANTS.NAV_BAR.KEY_TO_PATH_MAP.get(eventKey));
    }
    else {
      PubSub.publish(CONSTANTS.PUB_SUB.LOGOUT);
    }
  }

  componentWillReceiveProps(nextProps) {
    const newKey = CONSTANTS.NAV_BAR.PATH_TO_KEY_MAP.get(nextProps.location.pathname.split('/')[1]);
    if(newKey !== this.state.activeKey) {
      this.setState({ activeKey: newKey });
    }
  }

  render()
  {
    if(this.props.isLoggedIn) {
      return (
        <Navbar collapseOnSelect fluid staticTop bsClass="cc-nav-menu navbar">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav justified activeKey={this.state.activeKey} onSelect={this.onSelect}>
              <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.SHOP}>Shop</NavItem>
              <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.DEALS}>Deals</NavItem>
              <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.CREDIT_CARDS}>Credit Cards</NavItem>
              <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.MERCHANTS}>Merchants</NavItem>
              <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.PROFILE}>Profile</NavItem>
              <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.LOGOUT}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.session.sessionId
  };
};

export default connect(mapStateToProps)(withRouter(NavMenu));
