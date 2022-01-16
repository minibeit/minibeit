import React, { useState } from "react";

import Presenter from "./presenter";

export default function DetailFilter({
  filter,
  setFilter,
  filterReset,
  search,
}) {
  const [data, setData] = useState(filter);

  const changePayType = (e) => {
    const copy = { ...data };
    if (e.target.value !== "CACHE") {
      copy.minPay = "";
    }
    copy[`${e.target.name}`] = e.target.value;
    setData(copy);
  };
  const changeFilter = (e) => {
    const copy = { ...data };
    copy[`${e.target.name}`] = e.target.value;
    setData(copy);
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

  return (
    <Presenter
      filterReset={filterReset}
      paymentType={paymentType}
      changePayType={changePayType}
      changeFilter={changeFilter}
      minPay={minPay}
      filter={filter}
      setFilter={setFilter}
      search={search}
      data={data}
    />
  );
}
