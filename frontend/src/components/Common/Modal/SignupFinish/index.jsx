import React from "react";
import { useHistory } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "../Portal";
import * as S from "./style";
import PVImg from "../../PVImg";

export default function SignupFinish({ inputData }) {
  const history = useHistory();

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn>
              <CloseIcon onClick={() => history.push("/")} />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <S.MessageBox>
              <div>🎉</div>
              <p>{inputData.name}님,</p>
              <p>미니바이트에 가입하신 것을 환영합니다!</p>
            </S.MessageBox>
            <S.DataBox>
              <S.ImgBox>
                {inputData.avatar ? (
                  <PVImg img={inputData.avatar} />
                ) : (
                  <S.Img src="/기본프로필.png" />
                )}
              </S.ImgBox>
              <p>{inputData.name}</p>
              <p>
                {inputData.year}.{inputData.month}.{inputData.date}
              </p>
              <p>
                {inputData.phoneNum1}
                {inputData.phoneNum2}
                {inputData.phoneNum3}
              </p>
              <p>{inputData.job}</p>
            </S.DataBox>
            <p>닫기 버튼을 누르시면 홈으로 돌아가요</p>
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
