import React, { useState } from "react";
import "moment/locale/ko";
import TimePicker from "react-datepicker";
import ko from "date-fns/locale/ko";

import DateInput from "./DateInput";
import SearchInput from "./SearchInput";

import FeedCategory from "../../../constants/FeedCategory";
import TimeSelectModal from "./TimeSelectModal";

import { ReactComponent as MinusIcon } from "../../../svg/마이너스.svg";
import { ReactComponent as PlusIcon } from "../../../svg/플러스.svg";
import { ReactComponent as PlaceIcon } from "../../../svg/위치.svg";
import { ReactComponent as CalendarIcon } from "../../../svg/달력.svg";
import NextIcon from "@mui/icons-material/ArrowForwardIos";

import * as S from "../style";

export default function DataSelect({ recruit, setRecruit, movePage }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [viewTimeSelect, setViewTimeSelect] = useState(true);
  const [viewCategory, setViewCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [timeSelectModal, setTimeSelectModal] = useState(false);

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
                  copy.doDateList = e;
                  setRecruit(copy);
                }}
              />
            </div>
          </S.DateBox>
          <S.CountBox visible={recruit.doDateList.length !== 0 ? true : false}>
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
                        selected={startTime}
                        onChange={setStartTime}
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
                        selected={endTime}
                        onChange={setEndTime}
                        timeFormat="aa h:mm"
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="종료시간"
                        timeIntervals={30}
                        dateFormat="aa h:mm"
                      />
                    </S.TimeInput>
                  </div>
                  <S.DetailTimeBtn onClick={() => setTimeSelectModal(true)}>
                    날짜 별 시간설정
                  </S.DetailTimeBtn>
                  {timeSelectModal && <TimeSelectModal />}
                </div>
                <S.SaveTimeBtn
                  onClick={() => {
                    if (startTime && endTime) {
                      const copy = { ...recruit };
                      copy.startTime = startTime;
                      copy.endTime = endTime;
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
            visible={recruit.startTime && recruit.endTime ? true : false}
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
