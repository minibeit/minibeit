import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";

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
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <p>
              해당 실험자를 {isAttend ? "'불참'" : "'참여'"} 처리하시겠습니까?
            </p>
            <div>
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
            </div>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <p>
              해당 실험자의 실험 참여가 {isAttend ? "'참여'" : "'불참'"}
              처리되었습니다
            </p>
            <div>
              <S.BlueButton
                onClick={() => {
                  setAskAttend(false);
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
