import React from "react";
import Portal from "../Portal";
import * as S from "./style";


// 게시글 등록 확인 알림창

export default function RegisterFeed ({setAlertSwitch,recruit,submit}) {
  const closeAlert = () => {
    setAlertSwitch(false);
  };
  return (
    <Portal>
      <S.AlertBackground>
        <S.AlertBox>
          <S.AlertContent>
            <p><span>'{recruit.title}'</span><br/> 
            게시글을 <span>등록</span>하시겠습니까?
            </p>
            <div>
              <S.GrayButton onClick={closeAlert}>아니오, 더 작성할게요</S.GrayButton>
              <S.BlueButton onClick={() => submit(recruit)}>네, 등록할게요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  )}