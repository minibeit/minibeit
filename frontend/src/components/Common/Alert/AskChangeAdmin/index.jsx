import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

export default function AskChangeAdmin({
  setchangeAdmin,
  changeAdmin,
  adminName,
}) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setchangeAdmin(false)} />
        </S.AlertHeader>
        <S.AlertContent>
          <InfoIcon />
          <S.AlertText>
            <p>관리자를 양도하시겠습니까?</p>
          </S.AlertText>
          <S.BtnGroup>
            <S.GrayButton onClick={() => setchangeAdmin(false)}>
              아니오, 관둘래요
            </S.GrayButton>
            <S.BlueButton onClick={() => changeAdmin(adminName)}>
              네, 허락할래요
            </S.BlueButton>
          </S.BtnGroup>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
