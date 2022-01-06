import React, { useState } from "react";
import Portal from "../Portal";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./style";

import Conditions from "../../Alert/Conditions";
import PersonalInformation from "../../Alert/PersonalInformation";

CreateAuthModal.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
};

export default function CreateAuthModal({ setModalSwitch, modalSwitch }) {
  const [personalInfoAlert, setPersonalInfoAlert] = useState(false);
  const [conditionsAlert, setConditionsAlert] = useState(false);

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
    setModalSwitch(!modalSwitch);
  };

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <S.CloseModalBtn>
            <CloseIcon onClick={closeModal} />
          </S.CloseModalBtn>
        </S.ModalHeader>
        <S.ModalContent>
          <S.FormTitleBox>
            <img src="/images/mainLogo2.png" alt="logo" />
            <p>
              더 빠르고 더 간편한
              <br />내 손안의 구인구직, 미니바이트
            </p>
          </S.FormTitleBox>
          <S.FormContainer>
            <S.KLoginButton onClick={kakaoLogin}>
              <img src="/images/kakao.png" alt="Klogo" />
              <p>카카오로 간편하게 시작하기</p>
            </S.KLoginButton>
            <S.GLoginButton onClick={googleLogin}>
              <img src="/images/google.png" alt="Glogo" />
              <p>구글로 간편하게 시작하기</p>
            </S.GLoginButton>
          </S.FormContainer>
          <S.Formexplain>
            <p>
              회원가입시
              <span onClick={() => setPersonalInfoAlert(true)}>
                개인정보 처리방침
              </span>
              과<span onClick={() => setConditionsAlert(true)}>이용약관</span>을
              확인하였으며, 동의합니다.
            </p>
          </S.Formexplain>
        </S.ModalContent>
        {personalInfoAlert && (
          <PersonalInformation setPersonalInfoAlert={setPersonalInfoAlert} />
        )}
        {conditionsAlert && (
          <Conditions setConditionsAlert={setConditionsAlert} />
        )}
      </S.ModalBox>
    </Portal>
  );
}
