import React from "react";
import { useRecoilValue } from "recoil";
import { recuritState } from "../../../recoil/recuritState";
import { SchoolSearch } from "../../Common";

import * as S from "../style";

export default function PSchoolSelect() {
  const recurit = useRecoilValue(recuritState);
  return (
    <>
      <h2>{recurit["businessProfile"].name}님!</h2>
      <h2>원하는 위치 근처의 학교를 선택하세요 </h2>
      <SchoolSearch use="Recurit" />
    </>
  );
}
