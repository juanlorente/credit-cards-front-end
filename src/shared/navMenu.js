import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PubSub from 'pubsub-js';
import CONSTANTS from './constants';
import apiClient from '../api/apiClient';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    apiClient.callCreditCardsApi(CONSTANTS.HTTP_METHODS.POST, '/logout', () => { });
    PubSub.publish(CONSTANTS.PUB_SUB.LOGOUT);
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
            <Nav justified>
              <LinkContainer to="/shop" activeClassName="active">
                <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.SHOP}>Shop</NavItem>
              </LinkContainer>
              <LinkContainer to="/deals" activeClassName="active">
                <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.DEALS}>Deals</NavItem>
              </LinkContainer>
              <LinkContainer to="/credit-cards" activeClassName="active">
                <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.CREDIT_CARDS}>Credit Cards</NavItem>
              </LinkContainer>
              <LinkContainer to="/merchants" activeClassName="active">
                <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.MERCHANTS}>Merchants</NavItem>
              </LinkContainer>
              <LinkContainer to="/profile" activeClassName="active">
                <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.PROFILE}>Profile</NavItem>
              </LinkContainer>
              <NavItem eventKey={CONSTANTS.NAV_BAR.KEYS.LOGOUT} onClick={this.logout}>Logout</NavItem>
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

NavMenu.propTypes = {
  isLoggedIn: PropTypes.string
};

export default connect(mapStateToProps)(NavMenu);
