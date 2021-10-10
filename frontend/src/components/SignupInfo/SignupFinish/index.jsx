import React from "react";
import { useHistory } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "../../Common/Modal/Portal";
import * as S from "./style";
import { PVImg } from "../../Common";

export default function SignupFinish({ setModalSwitch, inputResult }) {
  const history = useHistory();
  console.log(inputResult);
  const closeModal = () => {
    setModalSwitch(false);
    history.push("/");
  };
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn>
              <CloseIcon onClick={closeModal} />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <p>🎉</p>
            <p>
              {inputResult.nickname}님, <br /> 미니바이트에 가입하신 것을
              환영합니다!
            </p>
            <S.ImgBox>
              {inputResult.img !== undefined ? (
                <PVImg img={inputResult.img} />
              ) : (
                <S.Img src="/기본프로필.png" />
              )}
            </S.ImgBox>
            <S.SignupInfoBox>
              <p>{inputResult.name}</p>
              <p>{inputResult.gender}</p>
              <p>{inputResult.birth}</p>
              <p>{inputResult.phoneNum}</p>
              <p>{inputResult.job}</p>
            </S.SignupInfoBox>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
