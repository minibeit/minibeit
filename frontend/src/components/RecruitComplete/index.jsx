import React from "react";
import * as S from "./style";
import { useHistory } from "react-router";

export default function RecruitComplete ({postId}) {
  const history = useHistory();
  return (
    <S.Background>
      <S.Box>
        <div>
        <p>작성완료!</p>
        <img src="/file.png" alt="이미지"/>
        <p>
          수고하셨습니다!<br/>
          비즈니스 프로필 페이지를 통해 대기자를 관리하고 참여자를 확정해보세요.
        </p>
        </div>
        <div>
        <S.GrayButton onClick={() =>history.push(`/apply/${postId}`)}>작성한 글을 확인할래요</S.GrayButton>
        <S.BlueButton onClick={() =>history.push('/')}>홈으로 갈래요</S.BlueButton>
      </div>
      </S.Box>
    </S.Background>
  );
}

