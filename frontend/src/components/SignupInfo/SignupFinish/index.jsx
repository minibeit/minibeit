import React from "react";
import Portal from "../../Common/Modal/Portal";
import * as S from "./style";

export default function SignupFinish({
  setModalSwitch,
  nickname,
  name,
  gender,
  phoneNum,
  job,
  birth,
}) {
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
            <p>🎉</p>
            <p>
              {nickname}님, <br /> 미니바이트에 가입하신 것을 환영합니다!
            </p>
            <S.SignupInfoBox>
              <p>{name}</p>
              <p>{gender}</p>
              <p>{birth}</p>
              <p>{phoneNum}</p>
              <p>{job}</p>
            </S.SignupInfoBox>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
