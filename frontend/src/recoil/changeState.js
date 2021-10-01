import { atom } from "recoil";

export const changeState = atom({
  key: "changeState",
  default: {
    change:0,
  },
});
