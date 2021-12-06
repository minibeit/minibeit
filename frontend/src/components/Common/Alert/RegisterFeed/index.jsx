import React from "react";
import Portal from "../Portal";
import * as S from "./style";

// 게시글 등록 확인 알림창

export default function RegisterFeed({ setAskComplete, recruit, submit }) {
  const clickOutside = (e) => {
    e.target === e.currentTarget && setAskComplete(0);
  };
  const closeBtn = () => {
    setAskComplete(0);
  };
  const registerBtn = () => {
    submit(recruit);
  };
  return (
    <Portal>
      <S.AlertBackground onClick={(e) => clickOutside(e)}>
        <S.AlertBox>
          <S.AlertContent>
            <p>
              <span>'{recruit.title}'</span>
              <br />
              게시글을 <span>등록</span>하시겠습니까?
            </p>
            <p>
              주의! 해당 게시글을 등록하시면, <span>상세 글</span> 외에는 수정이
              불가해요.
              <br />
              수정이 필요하다면, 다시 한번 확인해주세요.
            </p>
            <div>
              <S.GrayButton onClick={closeBtn}>
                아니오, 더 작성할게요
              </S.GrayButton>
              <S.BlueButton onClick={registerBtn}>네, 등록할게요</S.BlueButton>
            </div>
          </S.AlertContent>
        </S.AlertBox>
      </S.AlertBackground>
    </Portal>
  );
}
