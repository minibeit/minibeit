import { atom } from "recoil";

export const applyState = atom({
  key: "applyState",
  default: {
    date: null,
    time: null,
  },
});
