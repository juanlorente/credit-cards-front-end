import axios from 'axios';
import CONSTANTS from '../shared/constants';

class ApiClient {
  static callCreditCardsApi(method, path, callback, data, sessionId) {
    let config = { headers: { [CONSTANTS.AUTHENTICATION_HEADER] : sessionId } };
    const url = process.env.API_HOST + path;
    let apiFunc;
    switch (method) {
      case CONSTANTS.HTTP_METHODS.GET:
        config.params = data;
        apiFunc = () => { return axios.get(url, config); };
        break;
      case CONSTANTS.HTTP_METHODS.POST:
        apiFunc = () => { return axios.post(url, data, config); };
        break;
      case CONSTANTS.HTTP_METHODS.PUT:
        apiFunc = () => { return axios.put(url, data, config); };
        break;
      case CONSTANTS.HTTP_METHODS.DELETE:
        config.params = data;
        apiFunc = () => { return axios.delete(url, config); };
        break;
    }

    apiFunc().then((response) => {
      callback(response);
    }).catch((error) => {
      if(error.response.status === 401) {
        sessionStorage.removeItem(CONSTANTS.LOCAL_STORAGE.SESSION_KEY);
      }
      callback(error.response);
    });
  }
}

export default ApiClient;
