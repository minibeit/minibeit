import React, { useState } from "react";
import moment from "moment";

import Presenter from "./presenter";

export default function DetailFilter({
  filter,
  setFilter,
  setFilterSwitch,
  filterReset,
  search,
}) {
  const createTimeArr = () => {
    var timeArr = ["00:00"];
    var time = moment().set("hour", 0).set("minute", 0).set("second", 0);
    for (var i = 0; i < 24; i++) {
      timeArr.push(time.add(1, "hours").format("HH:mm"));
    }
    return timeArr;
  };
  const [timeArr] = useState(createTimeArr);

  const changePayType = (e) => {
    const copy = { ...filter };
    if (e.target.value !== "CACHE") {
      copy.minPay = "";
    }
    copy[`${e.target.name}`] = e.target.value;
    setFilter(copy);
  };
  const changeFilter = (e) => {
    const copy = { ...filter };
    copy[`${e.target.name}`] = e.target.value;
    setFilter(copy);
  };

  const paymentType = [
    { name: "전체", value: "" },
    { name: "현금", value: "CACHE" },
    { name: "물품", value: "GOODS" },
  ];
  const minPay = [
    { name: "전체", value: "" },
    { name: "1만원 미만", value: "9999" },
    { name: "1만원 이상", value: "10000" },
    { name: "3만원 이상", value: "30000" },
    { name: "5만원 이상", value: "50000" },
  ];
  const doTime = [
    { name: "전체", value: "" },
    { name: "30분 이내", value: "30" },
    { name: "1시간 이내", value: "60" },
    { name: "3시간 이내", value: "180" },
    { name: "3시간 이상", value: "181" },
  ];

  return (
    <Presenter
      filterReset={filterReset}
      setFilterSwitch={setFilterSwitch}
      paymentType={paymentType}
      filter={filter}
      changePayType={changePayType}
      changeFilter={changeFilter}
      minPay={minPay}
      doTime={doTime}
      timeArr={timeArr}
      setFilter={setFilter}
      search={search}
    />
  );
}
