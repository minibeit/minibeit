import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

export default function AskAttendance({
  setAskAttend,
  setSecondAlert,
  secondAlert,
  time,
  id,
  isAttend,
  changeAttend,
}) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setAskAttend(false)} />
        </S.AlertHeader>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <span>해당 실험자를 {isAttend ? "'불참'" : "'참여'"}</span>
              <span> 처리하시겠습니까?</span>
            </S.AlertText>
            <S.BtnGroup>
              <S.GrayButton onClick={() => setAskAttend(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton
                onClick={() => {
                  changeAttend(time, id, isAttend);
                }}
              >
                네, 허락할래요
              </S.BlueButton>
            </S.BtnGroup>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <S.AlertText>
              <span>해당 실험자의 실험 참여가</span>
              <span>
                {isAttend ? "'불참'" : "'참여'"}
                처리되었습니다
              </span>
            </S.AlertText>
            <S.BtnGroup>
              <S.BlueButton
                onClick={() => {
                  setAskAttend(false);
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
