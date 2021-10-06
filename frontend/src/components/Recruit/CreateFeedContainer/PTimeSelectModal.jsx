import React, { useState } from "react";
import Portal from "../../Common/Modal/Portal";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "../react-calendar.css";

import moment from "moment";
import "moment/locale/ko";

import * as S from "../style";

PTimeSelectModal.propTypes = {
  recruit: PropTypes.shape({
    businessProfile: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    school: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    headCount: PropTypes.number,
    doTime: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    timeList: PropTypes.arrayOf(PropTypes.string),
    dateList: PropTypes.arrayOf(PropTypes.string),
    exceptDateList: PropTypes.arrayOf(PropTypes.string),
    doDateList: PropTypes.arrayOf(
      PropTypes.shape({
        dodate: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    condition: PropTypes.bool,
    conditionDetail: PropTypes.array,
    payment: PropTypes.string,
    pay: PropTypes.string,
    payMemo: PropTypes.string,
    images: PropTypes.array,
    address: PropTypes.string,
    contact: PropTypes.string,
  }),
  setRecruit: PropTypes.func.isRequired,
  modalSwitch: PropTypes.bool.isRequired,
  setModalSwitch: PropTypes.func.isRequired,
  createdGroup: PropTypes.array.isRequired,
  setCreatedGroup: PropTypes.func.isRequired,
};

export default function PTimeSelectModal({
  recruit,
  setRecruit,
  modalSwitch,
  setModalSwitch,
  createdGroup,
  setCreatedGroup,
}) {
  const closeModal = () => {
    setModalSwitch(false);
  };
  const [group] = useState([
    { id: 1, color: "#0be881", dateList: [] },
    { id: 2, color: "#f7d794", dateList: [] },
    { id: 3, color: "#cf6a87", dateList: [] },
    { id: 4, color: "#574b90", dateList: [] },
    { id: 5, color: "#63cdda", dateList: [] },
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

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <h2>정확한 실험 시간을 날짜마다 정해보세요</h2>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.CalendarView>
              <Calendar
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
                <S.GroupBtn
                  onClick={() => {
                    if (createdGroup.length < 5) {
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
              </S.GroupBox>
            </S.CalendarView>
            <S.TimeBtnBox>
              <>
                {selectGroup &&
                  selectGroup.dateList.map((a, i) => <span key={i}>{a} </span>)}
              </>
              <>
                {selectGroup &&
                  recruit.timeList.map((a, i) => {
                    return (
                      <div key={`${selectGroup.id}_${i}`}>
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
                      </div>
                    );
                  })}
              </>
              <button
                onClick={() => {
                  setModalSwitch(!modalSwitch);
                }}
              >
                저장
              </button>
            </S.TimeBtnBox>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
