import axios from "axios";

export function setInterceptors(instance) {
  //요청 인터셉터
  instance.interceptors.request.use(
    (res) => {
      // 토큰을 추가하여 리턴
      res.headers.Authorization = `Bearer ${axios.defaults.headers.common["Authorization"]}`;
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  //응답 인터셉터
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const { config, response } = err;

      let originalRequest = config;

      if (response.data.error === "Unauthorized") {
        //엑세스 코드가 없거나 만료되었을 때
        return axios
          .post(process.env.REACT_APP_API_URL + "/api/user/refreshtoken")
          .then((res) => {
            axios.defaults.headers.common["Authorization"] =
              res.data.data.accessToken; // 저장되어있는 리프레쉬 캐쉬를 자동으로 보내고 엑세스 토큰을 받아와서 새로 저장
          })
          .then(() => {
            originalRequest.headers.Authorization = `Bearer ${axios.defaults.headers.common["Authorization"]}`; // 저장된 엑세스 코드를 헤더에 넣고 원래 요청을 다시 요청
            return axios(originalRequest);
          })
          .catch((err) => {
            // 리프레쉬 캐쉬도 만료되었을 때 실행되는 구문
            alert("다시 로그인 해주세요!");
            localStorage.removeItem("recoil-persist");
            window.location.replace("/");
          });
      } else {
        return Promise.reject(err);
      }
    }
  );
  return instance;
}
