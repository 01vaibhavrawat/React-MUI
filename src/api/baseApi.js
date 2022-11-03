import axios from 'axios'
import { API_KEY, BASE_URL } from './config';

class Api {
  async getApi(url, params, header) {
    if (!params) {
      params = new URLSearchParams();
    }
    if (!header) {
      header = {
        'subscription': API_KEY
      }
    }
    const response = await axios.get(BASE_URL + url, {
      headers: header,
      params
    });
    return response.data;
  };

  async postApi(url, payload, header) {
    if (!header) { header = { 'subscription': API_KEY } }
    const response = await axios.post(BASE_URL + url, payload, { headers: header })
    return response;
  };

  async deleteApi(url, header) {
    if (!header) { header = { 'subscription': API_KEY } }
    const response = await axios.delete(BASE_URL + url, { headers: header })
    return response;
  };
}
export default new Api();

