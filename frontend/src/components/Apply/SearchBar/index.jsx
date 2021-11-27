import React from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import SearchInput from "./SearchInput";
import DatePicker from "react-datepicker";
import "./date-picker.css";

import * as S from "../style";

export default function SearchBar({
  school,
  setSchool,
  date,
  setDate,
  search,
}) {
  const userSchoolId = useRecoilValue(userState).schoolId;

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
        <S.SearchBtn onClick={() => search(school.schoolId, 1)}>
          검색하기
        </S.SearchBtn>
      </div>
    </S.SearchBox>
  );
}
