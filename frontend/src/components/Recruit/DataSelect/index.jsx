import React, { useState } from "react";

import moment from "moment";
import "moment/locale/ko";
import TimePicker from "react-datepicker";
import ko from "date-fns/locale/ko";

import DateInput from "./DateInput";
import SearchInput from "./SearchInput";
import TimeSelectModal from "./TimeSelectModal";

import FeedCategory from "../../../constants/FeedCategory";

import { ReactComponent as MinusIcon } from "../../../svg/마이너스.svg";
import { ReactComponent as PlusIcon } from "../../../svg/플러스.svg";
import { ReactComponent as PlaceIcon } from "../../../svg/위치.svg";
import { ReactComponent as CalendarIcon } from "../../../svg/달력.svg";
import NextIcon from "@mui/icons-material/ArrowForwardIos";

import * as S from "../style";

export default function DataSelect({ recruit, setRecruit, movePage }) {
  const [viewTimeSelect, setViewTimeSelect] = useState(true);
  const [timeSelectModal, setTimeSelectModal] = useState(false);
  const [viewCategory, setViewCategory] = useState(false);
  const [category, setCategory] = useState(null);

  const [createdGroup, setCreatedGroup] = useState([]);

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
          <p>{recruit.businessProfile.name} 님!</p>
          <p>생성할 모집공고에 대한 날짜를 입력해주세요</p>
        </S.DataSelectHeader>
        <S.SelectBox>
          <S.PlaceBox>
            <p>위치</p>
            <div>
              <PlaceIcon />
              <SearchInput
                onChange={(e) => {
                  const copy = { ...recruit };
                  copy.schoolId = e ? e.value : null;
                  setRecruit(copy);
                }}
              />
            </div>
          </S.PlaceBox>
          <S.DateBox visible={recruit.schoolId ? true : false}>
            <p>날짜</p>
            <div>
              <CalendarIcon />
              <DateInput
                minDate={new Date()}
                onChange={(e) => {
                  const copy = { ...recruit };
                  copy.dateList = e;
                  copy.startDate = e[0];
                  copy.endDate = e[e.length - 1];
                  setRecruit(copy);
                }}
              />
            </div>
          </S.DateBox>
          <S.CountBox visible={recruit.dateList ? true : false}>
            <p>시간 단위</p>
            <div>
              <button
                onClick={() => {
                  setViewTimeSelect(true);
                  changeDoTime("minus");
                }}
              >
                <MinusIcon />
              </button>
              <p>{recruit.doTime}분</p>
              <button
                onClick={() => {
                  setViewTimeSelect(true);
                  changeDoTime("plus");
                }}
              >
                <PlusIcon />
              </button>
            </div>
            {viewTimeSelect && (
              <S.TimeSelectBox>
                <div>
                  <div>
                    <S.TimeInput>
                      <p>시작시간</p>
                      <TimePicker
                        locale={ko}
                        selected={recruit.startTime}
                        onChange={(time) => {
                          const copy = { ...recruit };
                          copy.startTime = time;
                          setRecruit(copy);
                        }}
                        timeFormat="aa h:mm"
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="시작시간"
                        timeIntervals={30}
                        dateFormat="aa h:mm"
                      />
                    </S.TimeInput>
                    {"~"}
                    <S.TimeInput>
                      <p>종료시간</p>
                      <TimePicker
                        locale={ko}
                        selected={recruit.endTime}
                        onChange={(time) => {
                          const copy = { ...recruit };
                          copy.endTime = time;
                          setRecruit(copy);
                        }}
                        timeFormat="aa h:mm"
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="종료시간"
                        timeIntervals={30}
                        dateFormat="aa h:mm"
                      />
                    </S.TimeInput>
                  </div>
                  <S.DetailTimeBtn
                    disabled={
                      !recruit.startTime || !recruit.endTime ? true : false
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
                      setViewTimeSelect(false);
                    } else {
                      alert("시작시간과 종료시간을 선택해주세요");
                    }
                  }}
                >
                  적용
                </S.SaveTimeBtn>
              </S.TimeSelectBox>
            )}
          </S.CountBox>
          <S.HeadCountBox
            visible={recruit.doDateList.length !== 0 ? true : false}
          >
            <p>시간 단위당 모집 인원</p>
            <div>
              <button onClick={() => changeHeadCount("minus")}>
                <MinusIcon />
              </button>
              <p>{recruit.headCount}명</p>
              <button onClick={() => changeHeadCount("plus")}>
                <PlusIcon />
              </button>
            </div>
          </S.HeadCountBox>
        </S.SelectBox>
        <S.NextBtn
          onClick={() => setViewCategory(true)}
          visible={recruit.headCount !== 0 ? true : false}
        >
          다음
          <NextIcon />
        </S.NextBtn>
        <S.CategoryContainer visible={viewCategory ? true : false}>
          <p>모집하는 실험의 카테고리를 골라보세요.</p>
          <div>
            {FeedCategory.map((a) => {
              return (
                <S.CategoryBtn
                  id={a.id}
                  key={a.id}
                  onClick={() => setCategory(a.name)}
                  disabled={category === a.name ? true : false}
                >
                  {a.icon}
                  {a.name}
                </S.CategoryBtn>
              );
            })}
          </div>
          <S.SaveBtn
            onClick={() => {
              const copy = { ...recruit };
              copy["category"] = category;
              setRecruit(copy);
              movePage(2);
            }}
          >
            확인
          </S.SaveBtn>
        </S.CategoryContainer>
      </S.DataSelectContainer>
    </S.Page>
  );
}
