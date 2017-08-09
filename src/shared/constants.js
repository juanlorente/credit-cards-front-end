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
  NAV_BAR: {
    KEYS: {
      SHOP: 1,
      DEALS: 2,
      CREDIT_CARDS: 3,
      MERCHANTS: 4,
      PROFILE: 5,
      LOGOUT: 6
    },
    KEY_TO_PATH_MAP: new Map([
      [1, '/shop'],
      [2, '/deals'],
      [3, '/credit-cards'],
      [4, '/merchants'],
      [5, '/profile']
    ]),
    PATH_TO_KEY_MAP: new Map([
      ['shop', 1],
      ['deals', 2],
      ['credit-cards', 3],
      ['merchants', 4],
      ['profile', 5]
    ])
  },
  PUB_SUB: {
    LOGOUT: 'LOGOUT'
  }
};