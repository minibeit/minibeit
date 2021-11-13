import { atom } from "recoil";

const today = new Date();

export const dateState = atom({
  key: "dateState",
  default: {
    date: today,
  },
});
export const filterState = atom({
  key: "filterState",
  default: {
    paymentType: "",
    minPay: "",
    doTime: "",
    startAndEnd: [0, 24],
    startTime: "",
    endTime: "",
  },
});
export const schoolState = atom({
  key: "schoolState",
  default: {
    schoolId: null,
    schoolName: null,
  },
});
export const categoryState = atom({
  key: "categoryState",
  default: {
    category: "ALL",
  },
});
