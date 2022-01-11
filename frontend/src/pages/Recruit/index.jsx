import React from "react";
import RecruitComponent from "../../components/Recruit";
import RecruitForMobileComponent from "../../components/Recruit/RecruitForMobile";

import * as S from "../style";

export default function Recruit() {
  return (
    <S.BackGround>
      {window.innerWidth > 700 ? (
        <RecruitComponent />
      ) : (
        <RecruitForMobileComponent />
      )}
    </S.BackGround>
  );
}
