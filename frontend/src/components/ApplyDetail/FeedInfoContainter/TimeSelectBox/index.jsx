import React, { useEffect, useState } from "react";
import { feedDetailTimeApi } from "../../../../utils/feedApi";
import { useRecoilState } from "recoil";
import { applyState } from "../../../../recoil/applyState";

import Presenter from "./presenter";

export default function TimeSelectBox({ feedId, date, startDate, endDate }) {
  const [apply, setApply] = useRecoilState(applyState);
  const [doTimeList, setDoTimeList] = useState();
  const [doDateList] = useState(createDoDateList(startDate, endDate));
  const [viewDoDate, setViewDoDate] = useState(
    date === "" ? doDateList[0] : date
  );
  const getFeedDetailTime = async (id, doDate) => {
    await feedDetailTimeApi(id, doDate)
      .then(async (res) => await setDoTimeList(res.data))
      .catch((err) => console.log(err));
  };
  const moveDate = (e) => {
    let target = e.target.nodeName === "path" ? e.target.parentNode : e.target;

    if (target.id === "next") {
      if (doDateList.indexOf(viewDoDate) !== doDateList.length - 1) {
        setViewDoDate(doDateList[doDateList.indexOf(viewDoDate) + 1]);
        getFeedDetailTime(
          feedId,
          doDateList[doDateList.indexOf(viewDoDate) + 1]
        );
      }
    } else {
      if (doDateList.indexOf(viewDoDate) !== 0) {
        setViewDoDate(doDateList[doDateList.indexOf(viewDoDate) - 1]);
        getFeedDetailTime(
          feedId,
          doDateList[doDateList.indexOf(viewDoDate) - 1]
        );
      }
    }
  };
  const selectDate = (e) => {
    const apply_cp = { ...apply };
    apply_cp["postId"] = feedId;
    apply_cp["postDoDateId"] = parseInt(e.target.id);
    apply_cp["doTime"] = e.target.textContent;
    apply_cp["doDate"] = viewDoDate;
    setApply(apply_cp);
  };

  useEffect(() => {
    getFeedDetailTime(feedId, viewDoDate);
  }, [feedId, viewDoDate]);

  return (
    <Presenter
      moveDate={moveDate}
      viewDoDate={viewDoDate}
      doTimeList={doTimeList}
      selectDate={selectDate}
      apply={apply}
    />
  );
}

// 시작날짜와 끝날짜를 입력하면 사이날짜를 뽑아주는 로직
const createDoDateList = (startDate, endDate) => {
  let dateList = [];

  const date = new Date(startDate);
  if (startDate === endDate) {
    dateList.push(startDate);
  } else {
    while (date.toISOString().slice(0, 10) <= endDate) {
      dateList.push(
        `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
      );
      date.setDate(date.getDate() + 1);
    }
  }
  return dateList;
};
