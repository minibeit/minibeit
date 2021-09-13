import { atom } from "recoil";

export const signupState = atom({
  key: "signupState",
  default: {
    schoolId: null,
    schoolName: null,
  },
});
