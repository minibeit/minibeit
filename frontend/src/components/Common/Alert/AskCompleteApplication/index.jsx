import React from "react";
import Portal from "../Portal";
import * as S from "./style";


//신청을 완료할것인지 묻는 알림창

export default function AskleteApplication ({setAskApplyAlert, apply, submit}) {
  const closeAlert = () => {
    setAskApplyAlert(false);
  };

  const doMonth = apply.doDate.substring(5,7);
  const doDay = apply.doDate.substring(8,);
  const time = apply.doTime.substring(0,2);
  const min = apply.doTime.substring(3,5);

  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <p>{doMonth}월 {doDay}일, {time >12 ? '오후' :'오전'} {time>12 ? time - 12 : time}시 {min !== "00" ? `${min}분` : null}<br/>
            참여를 신청하시겠습니까?</p>
            <p>날짜, 시간, 장소를 꼭 확인해주세요.</p>
            <div>
              <S.GrayButton onClick={closeAlert}>아니오</S.GrayButton>
              <S.BlueButton onClick={() => submit(apply.postDoDateId)}>신청</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}