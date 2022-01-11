import React from "react";
import * as S from "../style";
import { useHistory } from "react-router-dom";
import { ReactComponent as InfoIcon } from "../../../svg/경고.svg";

export default function RecruitForMobile() {
  const history = useHistory();
  return (
    <S.MobileContainer>
      <InfoIcon />
      <S.Txt>
        <p>PC로 이용 해주세요</p>
        <p>
          모집하기는 PC에서만 가능합니다
          <br />
          PC에서 이용해주세요!
        </p>
      </S.Txt>
      <button onClick={() => history.push("/")}>홈으로 갈래요</button>
    </S.MobileContainer>
  );
}
