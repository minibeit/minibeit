import { atom } from "recoil";

export const filterState = atom({
  key: "filterState",
  default: {
    schoolId: null,
    startDate: null,
    endDate: null,
  },
});
