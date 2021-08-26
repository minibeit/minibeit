import React from "react";
import * as S from "../style";

function PSignupForm() {
  const kakaoLogin = () => {
    window.location.replace(
      `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`
    );
  };
  return (
    <S.FormsignupContainer>
      <S.SignupButton onClick={kakaoLogin}>카카오 회원가입</S.SignupButton>
    </S.FormsignupContainer>
  );
}
export default PSignupForm;
