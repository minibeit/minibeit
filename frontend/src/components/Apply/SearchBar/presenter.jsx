import React from "react";
import DatePicker from "react-datepicker";
import "../date-picker.css";
import { CSSTransition } from "react-transition-group";

import SchoolSelect from "../../Common/SchoolSelect";

import * as S from "../style";
export default function Presenter({
  feedList,
  userSchoolId,
  filter,
  setFilter,
  date,
  setDate,
  search,
}) {
  return (
    <CSSTransition in={!feedList} classNames="move" timeout={500}>
      <S.SearchBox>
        <p>참여하기</p>
        <p>내 일정에 맞는 리서치를 검색하시고 보상을 획득하세요!</p>
        <div>
          <S.SchoolSelect>
            <SchoolSelect
              defaultValue={userSchoolId}
              onChange={(e) => {
                if (e) {
                  const copy = { ...filter };
                  copy.schoolId = e.value;
                  copy.schoolName = e.label;
                  setFilter(copy);
                }
              }}
            />
          </S.SchoolSelect>
          <S.DateSelect>
            <DatePicker
              selected={date["date"]}
              onChange={(date) => {
                const copy = { ...date };
                copy.date = date;
                setDate(copy);
              }}
              dateFormat="yyyy.MM.dd"
              className="datePickerInput"
            />
          </S.DateSelect>
          <S.SearchBtn onClick={search}>검색하기</S.SearchBtn>
        </div>
      </S.SearchBox>
    </CSSTransition>
  );
}
