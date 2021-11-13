import React from "react";
import Portal from "../Portal";
import * as S from "./style";
import { useHistory } from "react-router";




//신청을 완료했음을 알려주는 알림창

export default function CompleteApplication ({user}) {
  
  const history = useHistory();
  const goHome = () => {
    history.push('/');
 }
 const checkApply = () => {
  history.push(`/profile/${user.name}`);
 }
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <p>신청이 완료되었습니다.</p>
            <p>검토 후 확정 알림을 보내드릴 예정입니다.</p>
            <div>
              <S.GrayButton onClick={goHome}>홈으로 가기</S.GrayButton>
              <S.BlueButton onClick={()=>checkApply()}>신청내역 확인하기</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}