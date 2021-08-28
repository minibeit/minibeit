import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";

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

      if (status === 401) {
        //리코일이 문제임
        const islogin = await useRecoilValue(userState);
        if (!islogin) {
          alert("로그인을 해주세요!");
          window.location.replace("/login");
        } else {
          const originalRequest = config;
          const data2 = await axios.post(
            "http://3.36.95.15:8080/api/user/refreshtoken",
            {} // token refresh api
          );
          console.log(data2);
          // 새로운 토큰 저장

          localStorage.setItem("accessToken", data2.data.AccessToken);
          originalRequest.headers.Authorization = `Bearer ${data2.data.AccessToken}`;
          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
