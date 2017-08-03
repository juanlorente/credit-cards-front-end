import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavMenu extends React.Component {
  constructor() {
    super();
  }

  render()
  {
    if(this.props.isLoggedIn) {
      return (
        <Navbar collapseOnSelect bsClass="cc-nav-menu navbar">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}>Shop</NavItem>
              <NavItem eventKey={2}>Deals</NavItem>
              <NavItem eventKey={3}>Credit Cards</NavItem>
              <NavItem eventKey={4}>Merchants</NavItem>
              <NavItem eventKey={5}>Profile</NavItem>
              <NavItem eventKey={6}>Logout</NavItem>
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

export default connect(mapStateToProps)(NavMenu);
