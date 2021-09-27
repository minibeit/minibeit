import { atom } from "recoil";

export const recruitState = atom({
  key: "recruitState",
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
    exceptDateList: [],
    category: "",
    title: "",
    content: "",
    condition: false,
    conditionDetail: [],
    payment: "cache",
    pay: null,
    payMemo: null,
    images: [],
    address: "",
    contact: "",
  },
});
