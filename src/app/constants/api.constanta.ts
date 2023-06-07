import { environment } from '../../environment';
const API_URL = environment.apiUrl;
const LOGIN_URL = `${API_URL}/auth/login`;
const LOGOUT_URL = `${API_URL}/auth/logout`;
const USER_URL = `${API_URL}/user`;

export default { LOGIN_URL, LOGOUT_URL, USER_URL };
