const API_URLS = {
  ///백엔드 맞추기!!! 수정전
  LOGIN_KAKAO: "/oauth2/authorization/kakao",
  SIGNUP: "/api/user/signup",
  TOKEN_REFRESH: "/api/user/refreshtoken",
  LOGOUT: "/api/user/logout",
  MY_USERINFO: "/api/user/me",
  EDIT_MY_USERINFO: "/api/user/update",
  LOGIN: "/api/user/login",
  N_CHECK: "/api/user/nickname/check",
  TOKEN_OBTAIN: "/account/token/obtain/",
  TOKEN_BLACKLIST: "/account/token/blacklist/",
  FEED_NEW: "/api/post/info",
  FEED_DATE_NEW: "/api/post/",
  GET_SCHOOL: "/api/school/search",
  GET_FEEDLIST: "/api/post/list/",
  GET_FEEDDETAIL: "/api/post/",
  APPLY_POST: "/api/post/",
  BOOKMARK_POST: "/api/post/",
  BPROFILE_NEW: "/api/business/profile",
  BPROFILELIST: "/api/business/profile/list/",
  BPROFILE_GET: "/api/business/profile/",
  BPROFILE_DELETE: "/api/business/profile/",
  BPROFILE_EDIT: "/api/business/profile/",
  BPROFILE_JOIN: "/api/business/profile/",
  BPROFILE_JOIN_DEL: "/api/business/profile/",
  GET_BP_USERGROUP: "/api/user/list/business/profile/",
  GET_LIKE_LIST: "/api/post/like/list?",
};
export default API_URLS;
