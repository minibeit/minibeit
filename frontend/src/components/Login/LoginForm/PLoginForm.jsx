import React from "react";
import * as S from "../style";

function PLoginForm() {
  const kakaoLogin = () => {
    window.location.replace(
      `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`
    );
  };
  const googleLogin = () => {
    window.location.replace(
      `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`
    );
  };
  return (
    <S.FormContainer>
      <S.LoginButton onClick={kakaoLogin}>카카오 로그인</S.LoginButton>
      <br />
      <S.LoginButton onClick={googleLogin}>구글 로그인</S.LoginButton>
    </S.FormContainer>
  );
}
export default PLoginForm;
