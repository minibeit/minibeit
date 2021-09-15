import { atom } from "recoil";

export const applyState = atom({
  key: "applyState",
  default: {
    postId: null,
    doDate: "",
    doTime: "",
    postDoDateId: null,
  },
});
