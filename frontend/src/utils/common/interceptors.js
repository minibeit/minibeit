import axios from "axios";

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    (res) => {
      res.headers.Authorization = `Bearer ${axios.defaults.headers.common["Authorization"]}`;
      return res;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const { config, response } = err;
      let originalRequest = config;
      if (response.data.error === "Unauthorized") {
        return axios
          .post(process.env.REACT_APP_API_URL + "/api/user/refreshtoken")
          .then((res) => {
            axios.defaults.headers.common["Authorization"] =
              res.data.data.accessToken;
          })
          .then(() => {
            originalRequest.headers.Authorization = `Bearer ${axios.defaults.headers.common["Authorization"]}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            window.location.replace("/");
            localStorage.clear();
          });
      } else {
        return Promise.reject(err);
      }
    }
  );
  return instance;
}
