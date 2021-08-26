import { atom } from "recoil";
import { persistAtom } from "./common";

export const userState = atom({
  key: "userState",
  default: {
    isLogin: false,
    name: null,
    id: null,
    didSignup: false,
  },
  effects_UNSTABLE: [persistAtom],
});
