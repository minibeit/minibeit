import React from "react";
import Portal from "../Portal";
import PropTypes from "prop-types";
import * as S from "./style";

CreateAuthModal.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
};

export default function CreateAuthModal({ setModalSwitch }) {
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
  const closeModal = () => {
    setModalSwitch(false);
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.FormContainer>
              <S.LoginButton onClick={kakaoLogin}>카카오 로그인</S.LoginButton>
              <br />
              <S.LoginButton onClick={googleLogin}>구글 로그인</S.LoginButton>
            </S.FormContainer>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
