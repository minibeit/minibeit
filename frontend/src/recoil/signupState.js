import { atom } from "recoil";

export const signupState = atom({
  key: "signupState",
  default: {
    avatar: null,
    name: null,
    nickname: null,
    gender: null,
    year: null,
    month: null,
    date: null,
    phoneNum1: "010",
    phoneNum2: null,
    phoneNum3: null,
    schoolId: null,
    job: null,
  },
});
