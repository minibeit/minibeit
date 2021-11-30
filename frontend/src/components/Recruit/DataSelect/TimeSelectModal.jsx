import React, { useState } from "react";
import Portal from "../../Common/Modal/Portal";
import PropTypes from "prop-types";
import Calendar from "react-calendar";

import moment from "moment";
import "moment/locale/ko";

import * as S from "../style";

export default function PTimeSelectModal({
  recruit,
  setRecruit,
  modalSwitch,
  setModalSwitch,
  createdGroup,
  setCreatedGroup,
}) {
  const [group] = useState([
    { id: 1, color: "#0642FF", dateList: [] },
    { id: 2, color: "#1AE5DA", dateList: [] },
    { id: 3, color: "#FFDB1D", dateList: [] },
    { id: 4, color: "#1C2362", dateList: [] },
    { id: 5, color: "#FF7C7C", dateList: [] },
    { id: 6, color: "#7B68FF", dateList: [] },
    { id: 7, color: "#FF9D43", dateList: [] },
  ]);
  const [selectGroup, setSelectGroup] = useState();

  /* 제외된 날짜를 block해주는 로직 */
  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return recruit.exceptDateList.find(
        (ele) =>
          moment(ele).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")
      );
    }
  };

  /* 선택한 날짜를 그룹에 추가&삭제하는 로직 */
  const setGroupDateList = (e, day) => {
    const copy = [...createdGroup];
    const dayString = moment(day).format("YYYY-MM-DD");
    for (var i = 0; i < copy.length; i++) {
      // 클릭했을 때 이미 날짜가 그룹에 속해있는 경우
      if (copy[i].dateList.includes(dayString)) {
        // 지금 선택되어있는 그룹과 같은 그룹일 경우 삭제
        if (selectGroup.id === copy[i].id) {
          copy[i].dateList.splice(copy[i].dateList.indexOf(dayString), 1);
          // 지금 선택되어있는 그룹과 다른 그룹일 경우 그룹 변경
        } else {
          copy[i].dateList.splice(copy[i].dateList.indexOf(dayString), 1);
        }
        // 클릭했을 때 날짜가 어느 그룹에도 속해있지 않을 경우
      } else if (selectGroup.id === copy[i].id) {
        copy[i].dateList.push(dayString);
      }
    }
    setCreatedGroup(copy);
  };

  /* 날짜가 그룹에 이미 속해있을 경우 속해있는 그룹의 색을 표시해주는 로직 */
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = moment(date).format("YYYY-MM-DD");
      if (
        createdGroup.filter((ele) => ele.dateList.includes(dateString))
          .length !== 0
      ) {
        const color = createdGroup.filter((ele) =>
          ele.dateList.includes(dateString)
        )[0].color;
        return <S.ColorView color={color}></S.ColorView>;
      } else {
        return <S.ColorView></S.ColorView>;
      }
    }
  };

  /* 그룹에 따라서 시간을 제외시키거나 추가시키는 로직 */
  const changeTime = (e) => {
    const date = e.target.nextSibling.textContent;
    const selectGroup_cp = { ...selectGroup };
    const createdGroup_cp = [...createdGroup];
    if (e.target.checked) {
      selectGroup_cp.timeList.push(date);
      createdGroup_cp[selectGroup_cp.id - 1].timeList = selectGroup_cp.timeList;
      setSelectGroup(selectGroup_cp);
      setCreatedGroup(createdGroup_cp);
    } else {
      selectGroup_cp.timeList.splice(selectGroup_cp.timeList.indexOf(date), 1);
      createdGroup_cp[selectGroup_cp.id - 1].timeList = selectGroup_cp.timeList;
      setSelectGroup(selectGroup_cp);
      setCreatedGroup(createdGroup_cp);
    }
  };

  const modalOff = () => {
    setModalSwitch(!modalSwitch);
    document.querySelector("body").removeAttribute("style");
  };

  return (
    <Portal>
      <S.ModalBackground>
        {/* <S.ModalBox>
          <S.ModalHeader>
            <div>
              <p>날짜별 시간 설정</p>
              <p>시간을 묶어서 설정하세요</p>
            </div>
            <p>
              선택한 실험 날짜 : {recruit.startDate.format("MM월DD일")}~
              {recruit.endDate.format("MM월DD일")}
            </p>
          </S.ModalHeader>
          <S.ModalContent>
            <S.CalendarView>
              <Calendar
                className="modalCalendar"
                calendarType="US"
                minDate={
                  recruit["startDate"] !== null
                    ? new Date(recruit["startDate"])
                    : null
                }
                maxDate={
                  recruit["endDate"] !== null
                    ? new Date(recruit["endDate"])
                    : null
                }
                onClickDay={(day, e) => {
                  if (selectGroup) {
                    setGroupDateList(e, day);
                  }
                }}
                defaultValue={
                  recruit.startDate !== null
                    ? new Date(recruit["startDate"])
                    : null
                }
                tileDisabled={tileDisabled}
                minDetail="month"
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
                tileContent={tileContent}
              />

              <S.GroupBox>
                <div>
                  <S.GroupBtn
                    onClick={() => {
                      if (createdGroup.length < 7) {
                        const copy = { ...group[createdGroup.length] };
                        copy.timeList = [...recruit.timeList];
                        setCreatedGroup([...createdGroup, copy]);
                      } else {
                        alert(`그룹은 최대 ${group.length}개 입니다.`);
                      }
                    }}
                  >
                    +
                  </S.GroupBtn>
                  {createdGroup.map((a) => {
                    return (
                      <S.GroupBtn
                        onClick={() => {
                          setSelectGroup(a);
                        }}
                        color={a.color}
                        key={a.id}
                      >
                        그룹 {a.id}
                      </S.GroupBtn>
                    );
                  })}
                </div>
              </S.GroupBox>
            </S.CalendarView>
            <S.TimeBtnContainer>
              <S.SelectDateView>
                {selectGroup && <p>그룹 {selectGroup.id}.</p>}
                {selectGroup &&
                  selectGroup.dateList.map((a, i) => <p key={i}>{a} </p>)}
              </S.SelectDateView>
              <S.TimeBtnBox>
                {selectGroup &&
                  recruit.timeList.map((a, i) => {
                    return (
                      <S.TimeBtn key={`${selectGroup.id}_${i}`}>
                        <input
                          type="checkbox"
                          id={`check_${a}`}
                          onClick={changeTime}
                          defaultChecked={
                            createdGroup[selectGroup.id - 1].timeList.includes(
                              a
                            )
                              ? true
                              : false
                          }
                        />
                        <label htmlFor={`check_${a}`}>{a}</label>
                      </S.TimeBtn>
                    );
                  })}
              </S.TimeBtnBox>
              <button onClick={modalOff}>저장</button>
            </S.TimeBtnContainer>
          </S.ModalContent>
        </S.ModalBox> */}
      </S.ModalBackground>
    </Portal>
  );
}
