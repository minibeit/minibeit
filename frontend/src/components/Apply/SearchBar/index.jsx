import React from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

import { DateInput, SchoolInput } from "../../Common";
import DoTimeInput from "./StartTimeInput";

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
      <p>일정에 맞는 모집 공고를 검색해보세요</p>
      <div>
        <S.SearchInput>
          <S.InputItem>
            <p>위치</p>
            <SchoolInput
              defaultId={userSchoolId}
              onChange={(e) => {
                const copy = { ...school };
                copy.schoolId = e.id;
                copy.schoolName = e.name;
                setSchool(copy);
              }}
            />
          </S.InputItem>
          <S.InputItem>
            <p>날짜</p>
            <DateInput
              minDate={new Date()}
              currentDate={date.date}
              setCurrentDate={setDate}
            />
          </S.InputItem>
          <S.InputItem>
            <p>시작시간</p>
            <DoTimeInput />
          </S.InputItem>
          <S.InputItem style={{ border: "none" }}>
            <p>소요시간</p>
            <input />
          </S.InputItem>
          <div>
            <S.SearchBtn
              onClick={() =>
                search(school.schoolId ? school.schoolId : userSchoolId, 1)
              }
            >
              검색
            </S.SearchBtn>
          </div>
        </S.SearchInput>
      </div>
    </S.SearchBox>
  );
}
