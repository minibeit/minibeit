import React from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import SearchInput from "./SearchInput";
import DatePicker from "react-datepicker";
import "./date-picker.css";

import { DateInput } from "../../Common";
import { ReactComponent as CalendarIcon } from "../../../svg/달력.svg";
import { ReactComponent as PlaceIcon } from "../../../svg/위치.svg";

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
        <S.PlaceInput>
          <p>위치</p>
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
          <PlaceIcon />
        </S.PlaceInput>
        <S.DateInput>
          <p>날짜</p>
          <DateInput
            minDate={new Date()}
            onChange={(e) => {
              const copy = { ...date };
              copy.date = e;
              setDate(copy);
            }}
            defaultDate={date.date}
          />
          <CalendarIcon />
        </S.DateInput>
        <S.SearchBtn onClick={() => search(school.schoolId, 1)}>
          검색하기
        </S.SearchBtn>
      </div>
    </S.SearchBox>
  );
}
