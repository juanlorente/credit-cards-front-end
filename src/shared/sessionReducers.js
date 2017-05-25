import actionTypes from './actionTypes';

const initialState = {};

function session(state = initialState, action) {
  switch (action.type) {
    case actionTypes.login:
      return Object.assign({}, action.data);
    case actionTypes.logout:
      return initialState;
    default:
      return state;
  }
}

export default session;
