import { atom } from "recoil";
import { persistAtom } from "./common";

export const userState = atom({
  key: "userState",
  default: {
    isLogin: false,
    name: null,
    id: null,
    didSignup: false,
    schoolId: null,
    bpId: 0,
    avatar: null,
    email: null,
  },
  effects_UNSTABLE: [persistAtom],
});
export const geustState = atom({
  key: "geustState",
  default: {
    isLogin: false,
    name: null,
    id: null,
    didSignup: false,
    schoolId: null,
    bpId: 0,
    avatar: null,
    email: "",
  },
});
