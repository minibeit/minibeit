import React from "react";
import Portal from "../Portal";
import * as S from "./style";


//신청을 완료할것인지 묻는 알림창

export default function AskleteApplication ({setAlertSwitch}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <p>9월 10일, 오전 10시<br/>
            참여를 신청하시겠습니까?</p>
            <p>날짜, 시간, 장소를 꼭 확인해주세요.
            </p>
            <div>
              <S.GrayButton onClick={closeAlert}>아니오</S.GrayButton>
              <S.BlueButton>신청</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}