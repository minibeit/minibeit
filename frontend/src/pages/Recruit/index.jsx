import React from "react";
import RecruitComponent from "../../components/Recruit";

import * as S from "../style";

export default function Recruit() {
  const mobileStyle = {
    textAlign: "center",
    marginTop: "10em",
    fontSize: "1.5em",
  };

  return (
    <S.BackGround>
      {window.innerWidth > 700 ? (
        <RecruitComponent />
      ) : (
        <div style={mobileStyle}>모집하기는 PC 환경에서 해주시기 바랍니다.</div>
      )}
    </S.BackGround>
  );
}
