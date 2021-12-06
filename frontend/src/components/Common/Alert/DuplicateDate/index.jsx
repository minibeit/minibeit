import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";

// 날짜가 겹쳤음을 알려주는 알림창

export default function DuplicateDate({ setAlertSwitch }) {
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <InfoIcon />
            <p>겹치는 날짜는 선택이 불가합니다.</p>
            <p>그룹을 변경해주세요.</p>
            <button onClick={() => setAlertSwitch(false)}>네, 알겠어요.</button>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
