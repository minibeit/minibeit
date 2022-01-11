import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as InfoIcon } from "../../svg/경고.svg";

import * as S from "../style";

function Main() {
  const history = useHistory();
  return (
    <S.BackGround>
      <S.NotFound>
        <InfoIcon />
        <S.Txt>
          <p>잘못된 경로입니다</p>
          <p>홈으로 다시 이동해주세요</p>
        </S.Txt>
        <button onClick={() => history.push("/")}>홈으로 갈래요</button>
      </S.NotFound>
    </S.BackGround>
  );
}
export default Main;
