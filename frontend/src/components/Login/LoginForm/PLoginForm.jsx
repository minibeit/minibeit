import React from "react";
import * as S from "../style";

function PLoginForm({ loginHandler }) {
  const kakaoLogin = () => {
    window.location.replace(
      `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`
    );
  };
  return (
    <S.FormContainer>
      <S.LoginButton onClick={kakaoLogin}>카카오 로그인</S.LoginButton>
    </S.FormContainer>
  );
}
export default PLoginForm;
