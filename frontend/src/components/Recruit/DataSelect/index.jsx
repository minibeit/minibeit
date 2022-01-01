import React, { useState } from "react";

import moment from "moment";
import "moment/locale/ko";

import { CSSTransition } from "react-transition-group";

import DateInput from "./DateInput";
import SchoolInput from "./SchoolInput";
import TimeSelectModal from "./TimeSelectModal";

import { ReactComponent as MinusIcon } from "../../../svg/마이너스.svg";
import { ReactComponent as PlusIcon } from "../../../svg/플러스.svg";

import { toast } from "react-toastify";

import * as S from "../style";

import TimePicker from "rc-time-picker";
import "./timepicker.css";

import DateChange from "../../Common/Alert/DateChange";

export default function DataSelect({ recruit, setRecruit, movePage }) {
  const [viewTimeSelect, setViewTimeSelect] = useState(true);
  const [timeSelectModal, setTimeSelectModal] = useState(false);
  const [resetAlert, setResetAlert] = useState(false);
  const [createdGroup, setCreatedGroup] = useState([]);
  const [step, setStep] = useState(1);

  const changeDoTime = (value) => {
    const copy = { ...recruit };
    copy.startTime = null;
    copy.endTime = null;
    setRecruit(copy);
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

  /* 모집인원 카운트 로직 */
  const changeHeadCount = (value) => {
    if (value === "minus") {
      const copy = { ...recruit };
      if (copy.headCount >= 1) {
        copy.headCount -= 1;
      }
      setRecruit(copy);
    } else {
      const copy = { ...recruit };
      copy.headCount += 1;
      setRecruit(copy);
    }
  };

  /*시간 단위 만드는 로직*/
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

  return (
    <S.Page>
      <S.DataSelectContainer>
        <S.DataSelectHeader>
          {step === 1 && <p>생성할 모집 공고에 대한 위치를 입력해주세요.</p>}
          {step === 2 && <p>모집 날짜를 입력해주세요.</p>}
          {step === 3 && <p>모집 시간을 입력해주세요.</p>}
          {step === 4 && <p>모집 인원을 입력해주세요.</p>}
        </S.DataSelectHeader>
        <S.SelectBox>
          <S.PlaceBox>
            <p>위치</p>
            <SchoolInput
              onChange={(e) => {
                const copy = { ...recruit };
                copy.schoolId = e ? e.id : null;
                setRecruit(copy);
                setStep(2);
              }}
            />
          </S.PlaceBox>
          <CSSTransition
            in={step >= 2}
            classNames="fadeIn"
            timeout={500}
            unmountOnExit
          >
            <S.DateBox>
              <p>날짜</p>
              <DateInput
                minDate={new Date()}
                onChange={(e) => {
                  const copy = { ...recruit };
                  copy.dateList = e;
                  copy.startDate = e[0];
                  copy.endDate = e[e.length - 1];
                  setRecruit(copy);
                  setStep(3);
                }}
              />
            </S.DateBox>
          </CSSTransition>
          <CSSTransition
            in={step >= 3}
            classNames="fadeIn"
            timeout={500}
            unmountOnExit
          >
            <S.CountBox>
              <p>시간 단위</p>
              <div>
                <button
                  onClick={() => {
                    if (createdGroup.length !== 0) {
                      setResetAlert(true);
                    } else {
                      setViewTimeSelect(true);
                      changeDoTime("minus");
                    }
                  }}
                >
                  <MinusIcon />
                </button>
                <p>{recruit.doTime}분</p>
                <button
                  onClick={() => {
                    if (createdGroup.length !== 0) {
                      setResetAlert(true);
                    } else {
                      setViewTimeSelect(true);
                      changeDoTime("plus");
                    }
                  }}
                >
                  <PlusIcon />
                </button>
              </div>
              <CSSTransition
                in={viewTimeSelect}
                classNames="fadeIn"
                timeout={500}
                unmountOnExit
              >
                <S.TimeSelectBox>
                  <div>
                    <div>
                      <S.TimeInput>
                        <p>시작시간</p>
                        <TimePicker
                          use12Hours
                          inputReadOnly
                          minuteStep={30}
                          showSecond={false}
                          format="a   h:mm"
                          onChange={(time) => {
                            if (createdGroup.length !== 0) {
                              setResetAlert(true);
                            } else {
                              const copy = { ...recruit };
                              copy.startTime = new Date(time);
                              setRecruit(copy);
                            }
                          }}
                          addon={(panel) => {
                            return (
                              <button
                                className="rc-time-save-button"
                                onClick={() => panel.close()}
                              >
                                확인
                              </button>
                            );
                          }}
                        />
                      </S.TimeInput>
                      {"~"}
                      <S.TimeInput>
                        <p>종료시간</p>
                        <TimePicker
                          use12Hours
                          inputReadOnly
                          minuteStep={30}
                          showSecond={false}
                          format="a   h:mm"
                          onChange={(time) => {
                            if (createdGroup.length !== 0) {
                              setResetAlert(true);
                            } else {
                              const copy = { ...recruit };
                              copy.endTime = new Date(time);
                              setRecruit(copy);
                            }
                          }}
                        />
                      </S.TimeInput>
                    </div>
                    <S.DetailTimeBtn
                      disabled={
                        recruit.startTime === null || recruit.endTime === null
                      }
                      onClick={() => {
                        setTimeSelectModal(true);
                        const copy = { ...recruit };
                        copy.timeList = createTimeArr(
                          recruit.startTime,
                          recruit.endTime,
                          recruit.doTime
                        );
                        setRecruit(copy);
                      }}
                    >
                      날짜 별 시간설정
                    </S.DetailTimeBtn>
                    {timeSelectModal && (
                      <TimeSelectModal
                        recruit={recruit}
                        modalSwitch={timeSelectModal}
                        setModalSwitch={setTimeSelectModal}
                        createdGroup={createdGroup}
                        setCreatedGroup={setCreatedGroup}
                      />
                    )}
                  </div>
                  <S.SaveTimeBtn
                    onClick={() => {
                      console.log(recruit.startTime);
                      console.log(recruit.endTime);
                      if (recruit.startTime && recruit.endTime) {
                        const copy = { ...recruit };
                        let timeList = createTimeArr(
                          recruit.startTime,
                          recruit.endTime,
                          recruit.doTime
                        );
                        copy.timeList = timeList;
                        copy.doDateList = createDoDateList(
                          recruit.dateList,
                          createdGroup,
                          timeList
                        );
                        setRecruit(copy);
                        setStep(4);
                        setViewTimeSelect(false);
                      } else {
                        toast.info("시작시간과 종료시간을 선택해주세요");
                      }
                    }}
                  >
                    적용
                  </S.SaveTimeBtn>
                </S.TimeSelectBox>
              </CSSTransition>
            </S.CountBox>
          </CSSTransition>
          <CSSTransition
            in={step >= 4}
            classNames="fadeIn"
            timeout={500}
            unmountOnExit
          >
            <S.CountBox>
              <p>시간 단위당 모집 인원</p>
              <div>
                <button onClick={() => changeHeadCount("minus")}>
                  <MinusIcon />
                </button>
                <p style={{ color: "#0642FF" }}>{recruit.headCount}명</p>
                <button onClick={() => changeHeadCount("plus")}>
                  <PlusIcon />
                </button>
              </div>
            </S.CountBox>
          </CSSTransition>
        </S.SelectBox>
        <CSSTransition
          in={recruit.headCount !== 0}
          classNames="fadeIn"
          timeout={500}
          unmountOnExit
        >
          <S.SaveBtn
            onClick={() => {
              viewTimeSelect
                ? toast.info("시간 입력을 적용한 후 시도해주세요")
                : movePage(2);
            }}
          >
            다음
          </S.SaveBtn>
        </CSSTransition>
      </S.DataSelectContainer>
      {resetAlert && (
        <DateChange
          setResetAlert={setResetAlert}
          setCreatedGroup={setCreatedGroup}
        />
      )}
    </S.Page>
  );
}
