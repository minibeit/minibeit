import React, { useState } from "react";
import Portal from "../../../Common/Modal/Portal";
import Calendar from "react-calendar";
import toast from "react-hot-toast";

import { ReactComponent as ArrowIcon } from "../../../../svg/체크.svg";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";

import moment from "moment";
import "moment/locale/ko";

import * as S from "./style";

export default function TimeSelectModal({
  recruit,
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
  const [selectGroup, setSelectGroup] = useState(
    createdGroup.length !== 0 && createdGroup[0]
  );

  /* 제외된 날짜를 block해주는 로직 */
  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return recruit.dateList.find(
        (ele) => ele === moment(date).format("YYYY-MM-DD")
      )
        ? false
        : true;
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
        copy[i].dateList.sort();
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
        return <S.ColorView color={color} />;
      } else {
        return <S.ColorView />;
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
  };

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <div>
            <p>동일한 시간으로 </p>
            <p>적용할 날짜를 선택해보세요</p>
          </div>
          <CloseIcon onClick={() => setModalSwitch(false)} />
        </S.ModalHeader>
        <S.ModalContent>
          <S.CalendarView blur={createdGroup.length === 0}>
            <Calendar
              calendarType="US"
              minDate={new Date(recruit["startDate"])}
              maxDate={new Date(recruit["endDate"])}
              onClickDay={(day, e) => {
                if (selectGroup) {
                  setGroupDateList(e, day);
                } else {
                  const copy = { ...group[createdGroup.length] };
                  copy.timeList = [...recruit.timeList];
                  copy.dateList.push(moment(day).format("YYYY-MM-DD"));
                  setCreatedGroup([...createdGroup, copy]);
                  setSelectGroup(copy);
                }
              }}
              defaultValue={new Date(recruit["startDate"])}
              tileDisabled={tileDisabled}
              minDetail="month"
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
              tileContent={tileContent}
              formatDay={(locale, date) => moment(date).format("D")}
            />
          </S.CalendarView>

          {createdGroup.length !== 0 && (
            <>
              <S.ScheduleView>
                <S.ScheduleNav>
                  <div>
                    <S.CalendarIcon>
                      <div />
                    </S.CalendarIcon>
                    <S.ScheduleSelect
                      onChange={(e) =>
                        setSelectGroup(createdGroup[e.target.value])
                      }
                      value={selectGroup ? selectGroup.id - 1 : ""}
                    >
                      <option disabled value=""></option>
                      {createdGroup.map((a, i) => {
                        return (
                          <option key={a.id} value={i}>
                            스케줄{a.id}
                          </option>
                        );
                      })}
                    </S.ScheduleSelect>
                  </div>
                  <S.CreateScheduleBtn
                    onClick={() => {
                      if (createdGroup.length < 7) {
                        const copy = { ...group[createdGroup.length] };
                        copy.timeList = [...recruit.timeList];
                        setCreatedGroup([...createdGroup, copy]);
                        setSelectGroup(copy);
                      } else {
                        toast.error(`그룹은 최대 ${group.length}개 입니다.`);
                      }
                    }}
                  >
                    <p>스케줄 추가</p>
                    {createdGroup.length === 0 && (
                      <div>
                        <ArrowIcon />
                      </div>
                    )}
                  </S.CreateScheduleBtn>
                </S.ScheduleNav>
                <S.List>
                  {selectGroup &&
                    selectGroup.dateList.map((a, i) => {
                      return (
                        <S.DateButton key={i}>
                          {moment(a).format("MM월 DD일")}{" "}
                          <CloseIcon
                            onClick={() => setGroupDateList(null, a)}
                          />
                        </S.DateButton>
                      );
                    })}
                </S.List>
              </S.ScheduleView>
              <S.TimeView>
                <S.TimeNav>
                  <div>
                    <S.ClockIcon>
                      <div />
                    </S.ClockIcon>
                    <p>시간</p>
                    <S.ColorView color={selectGroup.color} />
                  </div>
                </S.TimeNav>
                <S.List>
                  {selectGroup &&
                    recruit.timeList.map((a, i) => {
                      return (
                        <S.TimeBtn
                          color={selectGroup.color}
                          key={`${selectGroup.id}_${i}`}
                        >
                          <input
                            type="checkbox"
                            id={`check_${a}`}
                            onClick={changeTime}
                            defaultChecked={
                              createdGroup[
                                selectGroup.id - 1
                              ].timeList.includes(a)
                                ? true
                                : false
                            }
                          />
                          <label htmlFor={`check_${a}`}>{a}</label>
                        </S.TimeBtn>
                      );
                    })}
                </S.List>
              </S.TimeView>
            </>
          )}
        </S.ModalContent>
        <S.ModalFooter onClick={modalOff}>확인</S.ModalFooter>
      </S.ModalBox>
    </Portal>
  );
}
