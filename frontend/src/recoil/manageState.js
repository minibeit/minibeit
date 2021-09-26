import { atom } from "recoil";
import { persistAtom } from "./common";

export const manageState = atom({
  key: "manageState",
  default: {
    nowTime : "Now",
    prevTime : "Prev",
  },
  effects_UNSTABLE: [persistAtom],
});
