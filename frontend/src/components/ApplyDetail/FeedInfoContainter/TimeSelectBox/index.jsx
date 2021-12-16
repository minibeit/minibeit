import React, { useEffect, useState } from "react";
import moment from "moment";
import { feedDetailTimeApi } from "../../../../utils/feedApi";
import { useRecoilState } from "recoil";
import { applyState } from "../../../../recoil/applyState";

import Presenter from "./presenter";

export default function CalendarButton({ feedId, date, startDate, endDate }) {
  const [apply, setApply] = useRecoilState(applyState);
  const [doTimeList, setDoTimeList] = useState();
  const [doDateList] = useState(createDoDateList(startDate, endDate));
  const [viewDoDate, setViewDoDate] = useState(
    date === "" ? doDateList[0] : date
  );
  const getFeedDetailTime = async (id, doDate) => {
    await feedDetailTimeApi(id, doDate).then(
      async (res) => await setDoTimeList(res.data.data)
    );
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
    apply_cp["doTime"] = e.target.value;
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
      setViewDoDate={setViewDoDate}
      doTimeList={doTimeList}
      startDate={startDate}
      endDate={endDate}
      selectDate={selectDate}
      apply={apply}
    />
  );
}

const createDoDateList = (startDate, endDate) => {
  let dateArr = [];
  let currentDate = moment(startDate);
  while (currentDate <= moment(endDate)) {
    dateArr.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "days");
  }
  return dateArr;
};
