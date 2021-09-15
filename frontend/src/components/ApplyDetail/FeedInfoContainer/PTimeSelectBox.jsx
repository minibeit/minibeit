import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { feedDetailTimeApi } from "../../../utils/feedApi";
import { useRecoilState } from "recoil";
import { applyState } from "../../../recoil/applyState";

PTimeSelectBox.propTypes = {
  feedId: PropTypes.number.isRequired,
  date: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default function PTimeSelectBox({ feedId, date, startDate, endDate }) {
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
    if (e.target.value === "next") {
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
  }, []);

  return (
    <>
      <h4>실험 날짜 및 시간 선택</h4>
      <p>
        모집기간 : {startDate.slice(0, 10)}~{endDate.slice(0, 10)}
      </p>
      <button value="pre" onClick={moveDate}>
        이전날짜
      </button>
      <span>{viewDoDate}</span>
      <button value="next" onClick={moveDate}>
        다음날짜
      </button>
      <div>
        {doTimeList ? (
          doTimeList.map((a) => {
            return (
              <button
                key={a.id}
                id={a.id}
                onClick={selectDate}
                disabled={
                  a.id === parseInt(apply["postDoDateId"]) ? true : false
                }
              >
                {a.startTime}~{a.endTime}
              </button>
            );
          })
        ) : (
          <p>이 날은 실험이 없습니다</p>
        )}
      </div>
    </>
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
