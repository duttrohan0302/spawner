import axios from 'axios';
// import store from '../Helpers/store';
// import { LOGOUT } from '../Actions/types';

const api = axios;

// api.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response.data.msg === 'Token is not valid') {
//       store.dispatch({ type: LOGOUT });
//     }
//     return Promise.reject(err);
//   }
// );

export default api;