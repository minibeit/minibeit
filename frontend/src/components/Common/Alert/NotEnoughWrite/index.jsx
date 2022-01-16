import React from "react";
import Portal from "../Portal";
import * as S from "../style";
import { ReactComponent as InfoIcon } from "../../../../svg/경고.svg";
import { ReactComponent as XIcon } from "../../../..//svg/엑스.svg";

// 게시글 제목이 비어있음을 알려주는 알림창

export default function NotEnoughWrite({ setNotEnough, movePage }) {
  return (
    <Portal>
      <S.AlertBox>
        <S.AlertHeader>
          <XIcon onClick={() => setNotEnough(false)} />
        </S.AlertHeader>
        <S.AlertContent>
          <InfoIcon />
          <S.AlertText>
            <p>제목을 작성하지 않으셨습니다. </p>
            <p>제목을 작성해주세요.</p>
          </S.AlertText>
          <S.BtnGroup>
            <S.BlueButton
              onClick={() => {
                setNotEnough(false);
                movePage(3);
              }}
            >
              네, 알겠어요.
            </S.BlueButton>
          </S.BtnGroup>
        </S.AlertContent>
      </S.AlertBox>
    </Portal>
  );
}
