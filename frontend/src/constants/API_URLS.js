const API_URLS = {
  ///백엔드 맞추기!!! 수정전
  LOGIN_KAKAO: "/oauth2/authorization/kakao",
  SIGNUP: "/api/user/signup",
  TOKEN_REFRESH: "/api/user/refreshtoken",
  LOGOUT: "/api/user/logout",
  MY_USERINFO: "/api/user/me",
  LOGIN: "/api/user/login",
  TOKEN_OBTAIN: "/account/token/obtain/",
  TOKEN_BLACKLIST: "/account/token/blacklist/",
  FEED_NEW: "/api/board",
  GET_SCHOOL: "/api/school/list",
  BPROFILE_NEW: "/api/business/profile",
  BPROFILELIST: '/api/business/profile/list/',
  BPROFILE_GET: '/api/business/profile/',
  BPROFILE_DELETE: '/api/business/profile/',
  BPROFILE_EDIT: '/api/business/profile/',
  BPROFILE_JOIN: '/api/business/profile/',
};
export default API_URLS;
