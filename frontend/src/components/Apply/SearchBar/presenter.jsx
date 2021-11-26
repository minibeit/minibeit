import React from "react";
import DatePicker from "react-datepicker";
import "./date-picker.css";

import SearchInput from "./SearchInput";

import * as S from "../style";
export default function Presenter({
  userSchoolId,
  school,
  setSchool,
  date,
  setDate,
  search,
}) {
  return (
    <S.SearchBox>
      <p>참여하기</p>
      <p>내 일정에 맞는 리서치를 검색하시고 보상을 획득하세요!</p>
      <div>
        <S.SchoolSelect>
          <SearchInput
            defaultValue={userSchoolId}
            onChange={(e) => {
              if (e) {
                const copy = { ...school };
                copy.schoolId = e.value;
                copy.schoolName = e.label;
                setSchool(copy);
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
  );
}
