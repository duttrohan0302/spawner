import api from './api';

const setAuthToken = (token) => {
  console.log("called set auth")
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;