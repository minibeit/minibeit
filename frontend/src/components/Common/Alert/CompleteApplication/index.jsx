import React from "react";
import Portal from "../Portal";
import * as S from "./style";


//신청을 완료했음을 알려주는 알림창

export default function CompleteApplication ({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <p>신청이 완료되었습니다.</p>
            <p>검토 후 확정 알림을 보내드릴 예정입니다.<br/>
            기획팀이 정해주세용
            </p>
            <div>
              <S.GrayButton onClick={closeAlert}>홈으로 가기</S.GrayButton>
              <S.BlueButton>신청내역 확인하기</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}