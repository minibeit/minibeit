import { atom } from "recoil";

const today = new Date();

export const filterState = atom({
  key: "filterState",
  default: {
    schoolId: null,
    schoolName: null,
    date: today,
    payment: "",
  },
});
