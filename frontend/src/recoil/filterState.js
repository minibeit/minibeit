import { atom } from "recoil";

const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1));

export const filterState = atom({
  key: "filterState",
  default: {
    schoolId: null,
    startDate: new Date(),
    endDate: tomorrow,
  },
});
