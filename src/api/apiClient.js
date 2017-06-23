import axios from 'axios';
import CONSTANTS from '../shared/constants';

class ApiClient {
  static callCreditCardsApi(method, path, callback, data) {
    const url = process.env.API_HOST + path;
    let config = {};
    let apiFunc;
    switch (method) {
      case CONSTANTS.HTTP_METHODS.GET:
        config.params = data;
        apiFunc = () => { return axios.get(url, config); };
        break;
      case CONSTANTS.HTTP_METHODS.POST:
        apiFunc = () => { return axios.post(url, data); };
        break;
      case CONSTANTS.HTTP_METHODS.PUT:
        apiFunc = () => { return axios.put(url, data); };
        break;
      case CONSTANTS.HTTP_METHODS.DELETE:
        config.params = data;
        apiFunc = () => { return axios.delete(url, config); };
        break;
    }

    apiFunc().then((response) => {
      callback(response);
    }).catch((error) => {
      // TODO: identify best way to handle these errors
      console.log(error);
      // callback(error.response);
    });
  }
}

export default ApiClient;