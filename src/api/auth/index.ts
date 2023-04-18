import API from 'api/API';
import { UserAuthData } from 'types/auth';

class AuthAPI extends API {
  async signup(data: UserAuthData) {
    return this.post('/users', data, { withCredentials: false });
  }

  async login(data: UserAuthData) {
    return this.post('/auth/login', data);
  }

  async logout() {
    return this.get('/auth/logout');
  }
}

const authAPI = new AuthAPI();
export default authAPI;
