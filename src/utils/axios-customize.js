import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const custom = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// put access token to request header
custom.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

// Add a request interceptor
custom.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const NO_RETRY_HEADER = "x-no-retry";

// Add a response interceptor
custom.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // handle 401 error, access token time out
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      // get new access token
      const access_token = await handleRefreshToken();
      // set no retry flag
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        // save access token to localStorage
        localStorage.setItem("access_token", access_token);
        // get new response
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        custom.defaults.headers.common = {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        };
        return custom.request(error.config);
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === `/api/v1/auth/refresh`
    ) {
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

// method to update token
async function handleRefreshToken() {
  const res = await custom.get("/api/v1/auth/refresh");
  if (res && res.data) {
    return res.data.access_token;
  }
  return null;
}

export default custom;
