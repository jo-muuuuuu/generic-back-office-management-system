import axios from "axios";

const baseURL = "/api";

class HttpRequrest {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getConfig() {
    const config = {
      baseURL: this.baseURL,
      header: {},
    };

    return config;
  }

  interception(axiosInstance) {
    axiosInstance.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    options = { options, ...this.getConfig() };

    const axiosInstance = axios.create();
    this.interception(axiosInstance);

    return axiosInstance(options);
  }
}

export default HttpRequrest(baseURL);
