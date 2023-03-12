import API from 'api/API';

import { LoginData } from './types';

class AuthAPI extends API {
  async signup(data: LoginData) {
    return this.post('/users', data, { withCredentials: false });
  }

  async login(data: LoginData) {
    return this.post('/auth/login', data);
  }

  async logout() {
    return this.get('/auth/logout');
  }
}

const authAPI = new AuthAPI();
export default authAPI;
