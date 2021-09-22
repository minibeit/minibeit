import React from "react";
import { useRecoilValue } from "recoil";
import { recruitState } from "../../../recoil/recruitState";
import { SchoolSearch } from "../../Common";

import * as S from "../style";

export default function PSchoolSelect() {
  const recruit = useRecoilValue(recruitState);

  return (
    <>
      <h2>{recruit["businessProfile"].name}님!</h2>
      <h2>원하는 위치 근처의 학교를 선택하세요 </h2>
      <SchoolSearch use="recruit" />
      {recruit["school"].id ? <button>확인</button> : null}
    </>
  );
}
