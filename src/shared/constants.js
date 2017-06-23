export default {
  AUTHENTICATION_HEADER: 'credit-cards-authentication',
  HTTP_METHODS: {
    DELETE: 'DELETE',
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
  },
  HTTP_STATUS_CODES: {
    OK: 200,
    INVALID_REQUEST: 400,
    INVALID_AUTHENTICATION: 401,
    NOT_AUTHORIZED: 403,
    ERROR: 500
  },
  LOCAL_STORAGE: {
    SESSION_KEY: 'credit-card-rewards-session',
    REMEMBER_ME_KEY: 'credit-card-rewards-remember-me'
  },
  PUB_SUB: {
    LOGOUT: 'LOGOUT'
  }
};
