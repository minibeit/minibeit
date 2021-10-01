import { atom } from "recoil";

const today = new Date();

export const filterState = atom({
  key: "filterState",
  default: {
    schoolId: null,
    schoolName: null,
    date: today,
    category: null,
    paymentType: "",
    minPay: null,
    doTime: null,
    startAndEnd: [0, 24],
    startTime: "00:00",
    endTime: "00:00",
  },
});
export const categoryState = atom({
  key: "categoryState",
  default: {
    category: null,
  },
});
