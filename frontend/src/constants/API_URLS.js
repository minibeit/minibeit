//환경변수 파일로 따로 분리해야할 듯
const BAISIC_URL = "http://3.36.95.15:8080";

const API_URLS = {
  ///백엔드 맞추기!!! 수정전
  LOGIN_KAKAO: BAISIC_URL + "/oauth2/authorization/kakao",
  SIGNUP: BAISIC_URL + "/api/user/signup",
  TOKEN_REFRESH: BAISIC_URL + "/api/user/refreshtoken",
  LOGOUT: BAISIC_URL + "/api/user/logout",
  USERINFO: "/account/userinfo/",
  LOGIN: "http://3.36.95.15:8080/api/user/login",
  TOKEN_OBTAIN: "/account/token/obtain/",
  TOKEN_BLACKLIST: "/account/token/blacklist/",
  FEED_NEW: "http://3.36.95.15:8080/api/board",
};
export default API_URLS;
