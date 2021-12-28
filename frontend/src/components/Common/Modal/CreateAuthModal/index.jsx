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
  const [conditionsAlert, setConditionsAlert] = useState(false);
  const [conditionsAlert2, setConditionsAlert2] = useState(false);

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
            <p>
              더 빠르고 더 간편한
              <br />내 손안의 구인구직, 미니바이트
            </p>
          </S.FormTitleBox>
          <S.FormContainer>
            <S.LoginButton color="#FFDB1D" onClick={kakaoLogin}>
              <p>카카오로 간편하게 시작하기</p>
            </S.LoginButton>
            <S.LoginButton color="#23252C" onClick={googleLogin}>
              <p>구글로 간편하게 시작하기</p>
            </S.LoginButton>
          </S.FormContainer>
          <S.Formexplain>
            <p>
              회원가입시
              <span onClick={() => setConditionsAlert(true)}>
                개인정보 처리방침
              </span>
              과<span onClick={() => setConditionsAlert(true)}>이용약관</span>을
              확인하였으며, 동의합니다.
            </p>
          </S.Formexplain>
        </S.ModalContent>
        {conditionsAlert && (
          <PersonalInformation setConditionsAlert={setConditionsAlert} />
        )}
        {conditionsAlert2 && (
          <Conditions setConditionsAlert={setConditionsAlert} />
        )}
      </S.ModalBox>
    </Portal>
  );
}
