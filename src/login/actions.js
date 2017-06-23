import actionTypes from '../shared/actionTypes.js';

export function login(id, user) {
  return {
    type: actionTypes.login,
    data: {
      sessionId: id,
      user: user
    }
  };
}

export function logout() {
  return {
    type: actionTypes.logout
  };
}