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
        if (
          error.response.data.message ===
          "Full authentication is required to access this resource"
        ) {
          const islogin = useRecoilValue(userState).islogin;
          if (!islogin) {
            alert("로그인을 해주세요!");
            window.location.replace("/login");
          } else {
            const originalRequest = config; //요청 정보
            const newTokenData = await axios.post(
              "http://3.36.95.15:8080/api/user/refreshtoken",
              {} // token refresh api (data2에서 newTokenData로 이름 변경함)
            );
            // 새로받은 토큰 저장함
            localStorage.setItem("accessToken", newTokenData.data.AccessToken);
            localStorage.setItem(
              "accessTokenExpiredAt",
              newTokenData.data.AccessTokenExpiredAt
            );
            //요청정보에 새로받은 헤더로 바꾼 후 리턴
            originalRequest.headers.Authorization = `Bearer ${newTokenData.data.AccessToken}`;
            return axios(originalRequest);
          }
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
