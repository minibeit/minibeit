import React from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { DateInput } from "../../Common";

import { ReactComponent as SearchIcon } from "../../../svg/돋보기.svg";

import SchoolInput from "./SchoolInput";
import StartTimeInput from "./StartTimeInput";
import DoTimeInput from "./DoTimeInput";

import * as S from "../style";

export default function SearchBar({
  page,
  school,
  setSchool,
  date,
  setDate,
  search,
}) {
  const userSchoolId = useRecoilValue(userState).schoolId;

  return (
    <S.SearchBox centerView={page ? false : true}>
      {page ? (
        <p style={page ? null : { textAlign: "center" }}>지원하기</p>
      ) : (
        <p style={page ? null : { textAlign: "center" }}>
          일정에 맞는 모집 공고를 <br />
          검색해보세요
        </p>
      )}
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
            <p>참여가능시간</p>
            <StartTimeInput />
          </S.InputItem>
          <S.InputItem>
            <p>소요시간</p>
            <DoTimeInput />
          </S.InputItem>
        </S.SearchInput>
        <S.SearchBtn
          onClick={() =>
            search(school.schoolId ? school.schoolId : userSchoolId, 1)
          }
        >
          <SearchIcon />
          검색
        </S.SearchBtn>
      </div>
    </S.SearchBox>
  );
}
