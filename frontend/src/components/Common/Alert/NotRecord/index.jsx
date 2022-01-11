import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

// 아직 연결 안함
export default function NotRecord({ setNotRecode, setMoveUrl }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setNotRecode(false)} />
        </S.AlertHeader>
        <S.AlertContent>
          <InfoIcon />
          <S.AlertText>
            <p>변경내용이 저장되지 않을 수 있습니다.</p>
          </S.AlertText>
          <S.BtnGroup>
            <S.GrayButton onClick={() => setNotRecode(false)}>
              아니오, 관둘래요
            </S.GrayButton>
            <S.BlueButton onClick={() => setMoveUrl(true)}>
              네, 괜찮아요.
            </S.BlueButton>
          </S.BtnGroup>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
