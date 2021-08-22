import axios from 'axios';
import { useRecoilValue } from "recoil";
import { cacheAdapterEnhancer } from 'axios-extensions';
import { userState } from '../recoil/userState';

const axiosInstance = axios.create({
  headers: { 'Cache-Control': 'no-cache' },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    
    if (status === 401) {
      if (error.response.data.message === "Full authentication is required to access this resource") {
        const islogin = useRecoilValue(userState).isLogin;
        if(!islogin) {
          alert('로그인을 해주세요!');
          window.location.replace("/login");
        }else{
          const originalRequest = config;
        console.log(originalRequest)
        const data2  = await axios.post( 
          'http://3.36.95.15:8080/api/user/refreshtoken',{},// token refresh api
          );
        console.log(data2)
        // 새로운 토큰 저장
        
        localStorage.setItem("accessToken", data2.data.AccessToken);
        localStorage.setItem("accessTokenExpiredAt", data2.data.AccessTokenExpiredAt);
        originalRequest.headers.Authorization = `Bearer ${data2.data.AccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
        }
        
      }
    }
    return Promise.reject(error);
  }
);

  export default axiosInstance;