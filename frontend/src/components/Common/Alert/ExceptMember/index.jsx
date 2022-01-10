import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

export default function ExceptMember({
  setExceptUser,
  secondAlert,
  setSecondAlert,
  deleteUser,
  user,
}) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setExceptUser(false)} />
        </S.AlertHeader>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <p>
                {user.nickname}님을 <br />
                그룹에서 제외하시겠습니까?
              </p>
            </S.AlertText>
            <S.BtnGroup>
              <S.GrayButton onClick={() => setExceptUser(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton
                onClick={() => {
                  deleteUser(user);
                }}
              >
                네, 제외할래요
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <p>
                {user.nickname}님이
                <br /> 그룹에서 제외되었습니다.
              </p>
            </S.AlertText>
            <S.BtnGroup>
              <S.BlueButton
                onClick={() => {
                  setExceptUser(false);
                  setSecondAlert(false);
                }}
              >
                확인
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        )}
      </S.AlertBox>
    </Portal>
  );
}
