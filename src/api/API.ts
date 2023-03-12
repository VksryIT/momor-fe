import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export interface APIResponse {
  status: number;
  message: string;
}

abstract class API {
  get(url: string, config?: AxiosRequestConfig) {
    return axios.get(url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return axios.post(url, data, config);
  }
}

export default API;
