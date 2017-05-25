import React from 'react';
import { connect } from 'react-redux';

class NavMenu extends React.Component {
  constructor() {
    super();
  }

  render()
  {
    if(this.props.isLoggedIn) {
      return (
        <nav className="nav-menu">
          <ul className="menu-list">
            <li className="menu-item selected">
              <a href="">Shop</a>
            </li>
            <li className="menu-item">
              <a href="">Deals</a>
            </li>
            <li className="menu-item">
              <a href="">Credit Cards</a>
            </li>
            <li className="menu-item">
              <a href="">Merchants</a>
            </li>
            <li className="menu-item">
              <a href="">Profile</a>
            </li>
            <li className="menu-item">
              <a href="">Logout</a>
            </li>
          </ul>
        </nav>
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
