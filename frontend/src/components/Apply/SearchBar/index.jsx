import React from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

import { DateInput, SchoolInput } from "../../Common";
import { ReactComponent as CalendarIcon } from "../../../svg/달력.svg";

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
          <SchoolInput
            defaultId={userSchoolId}
            onChange={(e) => {
              const copy = { ...school };
              copy.schoolId = e.id;
              copy.schoolName = e.name;
              setSchool(copy);
            }}
          />
        </S.PlaceInput>
        <S.DateInput>
          <CalendarIcon />
          <DateInput
            minDate={new Date()}
            onChange={(e) => {
              const copy = { ...date };
              copy.date = e;
              setDate(copy);
            }}
            defaultDate={date.date}
          />
        </S.DateInput>
        <S.SearchBtn
          onClick={() =>
            search(school.schoolId ? school.schoolId : userSchoolId, 1)
          }
        >
          검색하기
        </S.SearchBtn>
      </div>
    </S.SearchBox>
  );
}
