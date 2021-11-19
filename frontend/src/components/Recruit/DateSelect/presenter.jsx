import React from "react";
import DatePicker from "react-datepicker";
import "react-dates/initialize";
import { CalendarDay, DateRangePicker, SingleDatePicker } from "react-dates";
import "../react-dates.css";
import "../date-picker.css";
import moment from "moment";
import "moment/locale/ko";
import TimeSelectModal from "./TimeSelectModal";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DateChange from "../../Common/Alert/DateChange";

import * as S from "../style";

export default function Presenter({
  startDate,
  endDate,
  focusedInput,
  setFocusedInput,
  focused,
  setFocused,
  check,
  askResetGroup,
  recruit,
  setRecruit,
  createDateArr,
  createExceptDate,
  exceptDateList,
  dateList,
  changeHeadCount,
  changeDoTime,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  createTimeArr,
  doTime,
  modalSwitch,
  setModalSwitch,
  createdGroup,
  setCreatedGroup,
  createDoDateList,
  movePage,
  resetAlert,
  setResetAlert,
  resetOk,
}) {
  return (
    <S.Page>
      <S.DateSelectContainer>
        <p>리서치 정보를 알려주세요.</p>
        <p>정확한 정보를 입력해주세요.</p>
        <S.DateContainer style={{ zIndex: 3 }}>
          <div>
            <p>실험 기간</p>
          </div>
          <DateRangePicker
            startDate={startDate}
            startDateId="start_date"
            endDate={endDate}
            endDateId="end_date"
            startDatePlaceholderText="시작 날짜 선택"
            endDatePlaceholderText="종료 날짜 선택"
            monthFormat={"YYYY년 MM월"}
            displayFormat="YYYY-MM-DD"
            hideKeyboardShortcutsPanel={true}
            onDatesChange={({ startDate, endDate }) => {
              if (
                startDate &&
                endDate &&
                endDate.diff(startDate, "days") > 31
              ) {
                alert("실험날짜는 31일 이내로 설정해주세요");
              } else {
                askResetGroup();
                const copy = recruit;
                copy.startDate = startDate;
                copy.endDate = endDate;
                setRecruit(copy);
                if (startDate && endDate !== null) {
                  const copy = recruit;
                  copy.dateList = createDateArr(startDate, endDate);
                  setRecruit(copy);
                }
              }
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => {
              setFocusedInput(focusedInput);
              const copy = { ...recruit };
              copy.exceptDateList = [];
              setRecruit(copy);
            }}
          />
        </S.DateContainer>

        <S.DateContainer style={{ zIndex: 2 }}>
          <div>
            <p>날짜 빼기</p>
          </div>
          <SingleDatePicker
            date={startDate}
            placeholder="날짜 제거"
            onDateChange={(e) => {
              askResetGroup();
              createExceptDate(e);
            }}
            focused={focused}
            onFocusChange={({ focused }) => {
              setFocused(focused);
            }}
            key={check}
            keepOpenOnDateSelect={true}
            numberOfMonths={2}
            isDayBlocked={(day) => {
              if (startDate > day || endDate < day) {
                return true;
              }
            }}
            dayAriaLabelFormat="hi"
            hideKeyboardShortcutsPanel
            monthFormat="YYYY년 MM월"
            disabled={startDate && endDate ? false : true}
            displayFormat={
              exceptDateList.length === 0
                ? "없음"
                : `${exceptDateList.length}일`
            }
            renderCalendarDay={(props) => {
              const { day, modifiers } = props;
              if (day && dateList.length !== 0) {
                if (dateList.find((ele) => ele === day.format("YYYY-MM-DD"))) {
                  modifiers && modifiers.add("selected");
                }
              }
              return <CalendarDay {...props} modifiers={modifiers} />;
            }}
          />
        </S.DateContainer>

        <S.DateContainer style={{ zIndex: 1 }}>
          <div>
            <p>실험당 모집인원</p>
          </div>
          <div>
            <S.MinusBtn onClick={() => changeHeadCount("minus")}>
              <RemoveIcon />
            </S.MinusBtn>
            <p>{recruit.headCount}명</p>
            <S.PlusBtn onClick={() => changeHeadCount("plus")}>
              <AddIcon />
            </S.PlusBtn>
          </div>
        </S.DateContainer>
        <S.TimeContainer>
          <S.DoTimeBox>
            <p>시간 단위</p>
            <div>
              <S.MinusBtn onClick={() => changeDoTime("minus")}>
                <RemoveIcon />
              </S.MinusBtn>
              <p>{recruit.doTime}분</p>
              <S.PlusBtn onClick={() => changeDoTime("plus")}>
                <AddIcon />
              </S.PlusBtn>
            </div>
            <p>시간 단위를 수정하면 하단의 시간설정의 초기화 됩니다</p>
          </S.DoTimeBox>
          <S.TimeBox>
            <div>
              <p>시작시간</p>
              <DatePicker
                selected={startTime}
                onChange={(date) => {
                  askResetGroup();
                  const copy = { ...recruit };
                  copy.startTime = moment(date).format("HH:mm");
                  setStartTime(date);
                  setRecruit(copy);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                className="datePickerInput"
              />
            </div>
            <div>
              <p>종료시간</p>
              <DatePicker
                selected={endTime}
                onChange={(date) => {
                  askResetGroup();
                  const copy = { ...recruit };
                  copy.endTime = moment(date).format("HH:mm");
                  setEndTime(date);
                  setRecruit(copy);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                className="datePickerInput"
              />
            </div>
          </S.TimeBox>
        </S.TimeContainer>
        <S.SaveBtn
          key={recruit}
          disabled={startTime && endTime && startDate && endDate ? false : true}
          onClick={() => {
            const copy = { ...recruit };
            copy.timeList = createTimeArr(startTime, endTime, doTime);
            setRecruit(copy);
            setModalSwitch(!modalSwitch);
          }}
        >
          날짜별 시간 설정하기
        </S.SaveBtn>
        {modalSwitch && (
          <TimeSelectModal
            recruit={recruit}
            setRecruit={setRecruit}
            setModalSwitch={setModalSwitch}
            modalSwitch={modalSwitch}
            createdGroup={createdGroup}
            setCreatedGroup={setCreatedGroup}
            createDoDateList={createDoDateList}
          />
        )}
        <S.SaveBtn
          disabled={startTime && endTime && startDate && endDate ? false : true}
          onClick={() => {
            const copy = { ...recruit };
            copy.timeList = createTimeArr(startTime, endTime, doTime);
            copy.doDateList = createDoDateList(
              dateList,
              createdGroup,
              createTimeArr(startTime, endTime, doTime)
            );
            setRecruit(copy);
            movePage(3);
          }}

        >
          저장
        </S.SaveBtn>
        {resetAlert && <DateChange resetOk={resetOk} setResetAlert={setResetAlert}/>}
      </S.DateSelectContainer>
    </S.Page>
  );
}
