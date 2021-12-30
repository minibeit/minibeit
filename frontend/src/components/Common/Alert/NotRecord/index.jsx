import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";

export default function NotRecord({ setNotRecode, setMoveUrl }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertContent>
          <InfoIcon />
          <p>변경내용이 저장되지 않을 수 있습니다.</p>
          <div>
            <S.GrayButton onClick={() => setNotRecode(false)}>
              아니오, 관둘래요
            </S.GrayButton>
            <S.BlueButton onClick={() => setMoveUrl(true)}>
              네, 괜찮아요.
            </S.BlueButton>
          </div>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
