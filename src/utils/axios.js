import axios from "axios";
import Qs from "qs";

const API = "https://api.ero.ink/";
const api = axios.create({
  transformRequest: [
    function(data) {
      data = Qs.stringify(data);
      return data;
    }
  ],
  baseURL: API,
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
});

api.interceptors.request.use(
  function(config) {
    return config;
  },
  function(err) {
    console.error(err);
  }
);

api.interceptors.response.use(response => {
  // const api = response.config.api
  try {
    return response.data;
  } catch (e) {
    // if (typeof api.onError === "function") api.onError(e)
    console.error(e);
    // TODO global error handler
  }
});

export default {
  install(vue) {
    vue.prototype.$api = {
      get(...args) {
        return api.get(...args);
      },
      post(...args) {
        return api.post(...args);
      },
      put(...args) {
        return api.put(...args);
      },
      raw(...args) {
        return api(...args);
      }
    };
  }
};
