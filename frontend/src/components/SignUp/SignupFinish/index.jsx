import React from "react";
import { useHistory } from "react-router";
import { ReactComponent as CloseIcon } from "../../../svg/엑스.svg";
import Portal from "../../Common/Modal/Portal";
import { PVImg } from "../../Common";

import * as S from "./style";
import { useRecoilState } from "recoil";
import { signupState } from "../../../recoil/signupState";

export default function SignupFinish() {
  const history = useHistory();
  const [inputData] = useRecoilState(signupState);

  const goHome = () => {
    history.push("/");
    document.querySelector("body").removeAttribute("style");
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn>
              <CloseIcon onClick={goHome} />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.MessageBox>
              <div>
                <img src="/images/party.png" alt="파티" />
              </div>
              <p>{inputData.name}님,</p>
              <p>미니바이트에 가입하신 것을 환영합니다!</p>
            </S.MessageBox>
            <S.DataBox>
              <S.ImgBox>
                {inputData.avatar ? (
                  <PVImg img={inputData.avatar} />
                ) : (
                  <S.Img src="/images/기본프로필.png" />
                )}
              </S.ImgBox>
              <p>{inputData.name}</p>
              <p>
                {inputData.year}.{inputData.month}.{inputData.date}
              </p>
              <p>{inputData.phoneNum}</p>
              <p>{inputData.job}</p>
            </S.DataBox>
            <p>닫기 버튼을 누르시면 홈으로 돌아가요</p>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
