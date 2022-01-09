import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { ReactComponent as InfoIcon } from "../../../..//svg/경고.svg";
// 정말로 해당 확정인을 확정할것인지 묻는 알림창
export default function AskApprove({
  secondAlert,
  setSecondAlert,
  id,
  time,
  setApproveUser,
  applyApprove,
}) {
  return (
    <Portal>
      <S.AlertBox>
        {!secondAlert ? (
          <S.AlertContent>
            <InfoIcon />
            <p>
              해당 실험자의 실험 참여를
              <br /> 허락하시겠습니까?
            </p>
            <div>
              <S.GrayButton onClick={() => setApproveUser(false)}>
                아니오, 관둘래요
              </S.GrayButton>
              <S.BlueButton onClick={() => applyApprove(time, id)}>
                네, 허락할래요
              </S.BlueButton>
            </div>
          </S.AlertContent>
        ) : (
          <S.AlertContent>
            <InfoIcon />
            <p>
              해당 실험자의 실험 참여를
              <br /> 허락했습니다.
            </p>
            <div>
              <S.BlueButton
                onClick={() => {
                  setApproveUser(false);
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
