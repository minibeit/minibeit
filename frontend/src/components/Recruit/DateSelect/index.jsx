import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import Presenter from "./presenter";

export default function DateSelect({ movePage, recruit, setRecruit }) {
  const { startDate, endDate, dateList, exceptDateList, doTime } = recruit;

  /* range calendar state */
  const [focusedInput, setFocusedInput] = useState(null);

  /* single calendar state */
  const [focused, setFocused] = useState(null);
  const [check, setCheck] = useState(false);

  /* time select */
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  /* time select calendar */
  const [modalSwitch, setModalSwitch] = useState(false);
  const [createdGroup, setCreatedGroup] = useState([]);

  /* 모집인원 카운트 로직 */
  const changeHeadCount = (value) => {
    if (value === "minus") {
      const copy = { ...recruit };
      if (copy.headCount > 1) {
        copy.headCount -= 1;
      }
      setRecruit(copy);
    } else {
      const copy = { ...recruit };
      copy.headCount += 1;
      setRecruit(copy);
    }
  };

  /* 실험 시간 단위 로직 */
  const changeDoTime = (value) => {
    if (value === "minus") {
      const copy = { ...recruit };
      if (copy.doTime > 30) {
        copy.doTime -= 30;
        setRecruit(copy);
      }
    } else {
      const copy = { ...recruit };
      copy.doTime += 30;
      setRecruit(copy);
    }
  };

  /* 실험 날짜 로직 */
  const createDateArr = (startDate, endDate) => {
    if (startDate < endDate) {
      const arr = [];
      let moveDate = moment(startDate);
      while (moveDate <= endDate) {
        arr.push(moment(moveDate).format("YYYY-MM-DD"));
        moveDate.add(1, "days");
      }
      return arr;
    } else {
      return null;
    }
  };

  /* 실험 날짜 빼는 로직 */
  const createExceptDate = (date) => {
    const copy = recruit;
    if (startDate.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")) {
      alert("실험 첫날은 지울수 없습니다");
    } else if (copy.dateList.includes(date.format("YYYY-MM-DD"))) {
      copy.dateList.splice(copy.dateList.indexOf(date.format("YYYY-MM-DD")), 1);
      copy.exceptDateList = [...copy.exceptDateList, date.format("YYYY-MM-DD")];
      setCheck(!check);
      setRecruit(copy);
    } else {
      copy.dateList = [...copy.dateList, date.format("YYYY-MM-DD")];
      copy.exceptDateList.splice(
        copy.exceptDateList.indexOf(date.format("YYYY-MM-DD")),
        1
      );
      setCheck(!check);
      setRecruit(copy);
    }
  };

  const createTimeArr = (startTime, endTime, doTime) => {
    const startMoment = moment(startTime, "HH:mm");
    const endMoment = moment(endTime, "HH:mm").clone().add(1, "minutes");
    const timeArr = [];
    while (startMoment.clone().add(doTime, "minutes") <= endMoment) {
      timeArr.push(
        `${startMoment.format("HH:mm")}~${startMoment
          .add(doTime, "minutes")
          .format("HH:mm")}`
      );
    }
    return timeArr;
  };

  /* 설정한 그룹과, 그룹이외의 날짜, 시간에 따른 설정을 계산을 해주는 로직 */
  const createDoDateList = (dateList, createdGroup, timeList) => {
    const new_dateList = [];
    const groupDateList = [];
    const doDateList = [];
    createdGroup.map((a) => groupDateList.push(...a.dateList));
    /* dateList에서 그룹으로 설정된 날짜를 제거하여 새로운 배열에 담는 작업 */
    for (var i = 0; i < dateList.length; i++) {
      if (groupDateList.includes(dateList[i]) !== true) {
        new_dateList.push(dateList[i]);
      }
    }
    /*new dateList의 날짜와 timeList의 시간 합치는 작업 */
    for (var j = 0; j < new_dateList.length; j++) {
      for (var k = 0; k < timeList.length; k++) {
        doDateList.push({
          doDate: `${new_dateList[j]}T${timeList[k].slice(0, 5)}`,
        });
      }
    }
    /* 그룹의 날짜와 그룹의 시간 합쳐서 새로운 배열을 만드는 작업 */
    const groupDoDateList = createdGroup.map((a) => {
      var arr = [];
      for (var i = 0; i < a.dateList.length; i++) {
        for (var j = 0; j < a.timeList.length; j++) {
          arr.push({
            doDate: `${a.dateList[i]}T${a.timeList[j].slice(0, 5)}`,
          });
        }
      }
      return arr;
    });
    /* 합쳐진 groupDoDateList를 doDateList에 넣는 작업 */
    for (var f = 0; f < groupDoDateList.length; f++) {
      doDateList.push(...groupDoDateList[f]);
    }

    return doDateList;
  };
  
  const [resetAlert, setResetAlert] = useState(false);
  const [resetAgree, setResetAgree] = useState(false);

  const resetOk = () => {
    setResetAlert(false);
    setResetAgree(true);
  }
  const askResetGroup = () => {
    if (createdGroup.length !== 0) {
      setResetAlert(true);
      if (resetAgree) {
        setCreatedGroup([]);
      }
    }
  };

  return (
    <Presenter
      startDate={startDate}
      endDate={endDate}
      focusedInput={focusedInput}
      setFocusedInput={setFocusedInput}
      focused={focused}
      setFocused={setFocused}
      check={check}
      askResetGroup={askResetGroup}
      recruit={recruit}
      setRecruit={setRecruit}
      createDateArr={createDateArr}
      createExceptDate={createExceptDate}
      exceptDateList={exceptDateList}
      dateList={dateList}
      changeHeadCount={changeHeadCount}
      changeDoTime={changeDoTime}
      startTime={startTime}
      setStartTime={setStartTime}
      endTime={endTime}
      setEndTime={setEndTime}
      createTimeArr={createTimeArr}
      doTime={doTime}
      modalSwitch={modalSwitch}
      setModalSwitch={setModalSwitch}
      createdGroup={createdGroup}
      setCreatedGroup={setCreatedGroup}
      createDoDateList={createDoDateList}
      movePage={movePage}
      resetAlert={resetAlert} 
      setResetAlert={setResetAlert} 
      resetOk={resetOk}

    />
  );
}
