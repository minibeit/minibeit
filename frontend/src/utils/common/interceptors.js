import axios from "axios";

export function setInterceptors(instance) {
  //요청 인터셉터
  instance.interceptors.request.use(
    (response) => {
      // 토큰을 추가하여 리턴
      response.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //응답 인터셉터
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    // 리프레쉬 관련
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      if (status === 401 ) {
        //리코일이 문제임
        const originalRequest = config;
        const refreshData = await axios.post(
          process.env.REACT_APP_API_URL + "/api/user/refreshtoken",
          {} // token refresh api
        );
        if (refreshData.data.error === "Unauthorized") {
          alert("다시 로그인 해주세요!")
          localStorage.removeItem("recoil-persist")
          window.location.replace("/");
        }
        // 새로운 토큰 저장
        localStorage.setItem("accessToken", refreshData.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${refreshData.data.accessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  return instance;
}