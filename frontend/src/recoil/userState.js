import { atom } from "recoil";
import { persistAtom } from "./common";

export const userState = atom({
  key: "userState",
  default: {
    isLogin: false,
    schoolId: null,
    avatar: null,
    bprofile: null,
  },
  effects_UNSTABLE: [persistAtom],
});
export const guestState = atom({
  key: "guestState",
  default: {
    isLogin: false,
    name: null,
    id: null,
    didSignup: false,
    schoolId: null,
    avatar: null,
    email: "",
  },
});
