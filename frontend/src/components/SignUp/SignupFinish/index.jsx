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

  console.log(inputData);
  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <S.CloseModalBtn>
            <CloseIcon onClick={() => history.push("/")} />
          </S.CloseModalBtn>
        </S.ModalHeader>
        <S.ModalContent>
          <S.MessageBox>
            <S.ImgBox>
              {!inputData.avatar === null ? (
                <PVImg img={inputData.avatar} />
              ) : (
                <img src="/images/팡파레아이콘.png" alt="파티" />
              )}
            </S.ImgBox>
            <p>{inputData.name}님,</p>
            <p>미니바이트에 가입하신 것을 환영합니다!</p>
          </S.MessageBox>
          <button onClick={() => history.push("/")}>별말씀을요</button>
          <p>닫기 버튼을 누르시면 홈으로 돌아가요</p>
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
  );
}
