import { atom } from "recoil";

export const recuritState = atom({
  key: "recuritState",
  default: {
    businessProfile: {
      id: null,
      name: null,
    },
    school: {
      id: null,
      name: null,
    },
    startDate: null,
    endDate: null,
    headCount: 1,
    doTime: 30,
    startTime: null,
    endTime: null,
    doDateList: null,
  },
});
