import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosError } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

interface ResponseData<T> {
  data: T;
}

interface ErrorData {
  code: string;
}

export type APIResponse<T> = AxiosResponse<ResponseData<T>>;
export type APIError = AxiosError<ErrorData>;
export type APIPromise<T = any> = Promise<APIResponse<T>>;

abstract class API {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<ResponseData<T>>(url, config);
    return response.data.data;
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): APIPromise {
    return axios.post(url, data, config);
  }
}

export default API;
