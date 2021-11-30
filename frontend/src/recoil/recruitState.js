import { atom } from "recoil";

export const recruitState = atom({
  key: "recruitState",
  default: {
    businessProfile: {
      id: null,
      name: null,
    },
    schoolId: null,
    startDate: null,
    endDate: null,
    headCount: 0,
    doTime: 30,
    startTime: null,
    endTime: null,
    timeList: [],
    dateList: null,
    exceptDateList: [],
    doDateList: [],
    category: null,
    title: "",
    content: "",
    condition: false,
    conditionDetail: [""],
    payment: "CACHE",
    pay: null,
    payMemo: null,
    images: [],
    address: "",
    detailAddress: "",
    contact: "",
  },
});
