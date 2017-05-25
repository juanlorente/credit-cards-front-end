import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
    return (
      <div className="loginForm">
        <h3>Login</h3>
        <form>
          <div className="formRow">
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={props.username} onChange={props.onUsernameChange} />
          </div>
          <div className="formRow">
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={props.password} onChange={props.onPasswordChange} />
          </div>
          <button type="submit" onClick={props.onSubmit}>Login</button>
        </form>
      </div>
    );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
