import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";

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
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <p>{user.nickname}님을 그룹에서 제외하시겠습니까?</p>
            <div>
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
            </div>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <p>{user.nickname}님이 그룹에서 제외되었습니다.</p>
            <div>
              <S.BlueButton
                onClick={() => {
                  setExceptUser(false);
                  setSecondAlert(false);
                }}
              >
                확인
              </S.BlueButton>
            </div>
          </S.AlertContent>
        )}
      </S.AlertBox>
    </Portal>
  );
}
