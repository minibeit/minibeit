import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

import Portal from "../Common/Modal/Portal";
import { nickCheckApi } from "../../utils/auth";
import { signupState } from "../../recoil/signupState";

import InfoData from "./InfoData";
import SchoolSelect from "./SchoolSelect";
import JobSelect from "./JobSelect";

import * as S from "./style";

export default function SignUpComponent() {
  const [inputData, setInputData] = useRecoilState(signupState);
  const [step, setStep] = useState(1);
  const history = useHistory();

  const onChange = (e) => {
    const { value, name } = e.target;
    const copy = { ...inputData };
    copy[name] = value;
    setInputData(copy);
  };
  const onFileChange = (e) => {
    const copy = { ...inputData };
    switch (e.target.id) {
      case "reset":
        copy.avatar = null;
        setInputData(copy);
        break;
      case "upload":
        copy.avatar = e.target.files[0];
        setInputData(copy);
        break;
      default:
        return;
    }
  };
  const checkingNickname = () => {
    nickCheckApi(inputData.nickname)
      .then((res) => alert("사용가능한 아이디 입니다"))
      .catch((err) => alert(err.response.data.error.info));
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            {step === 1 && <p>프로필 작성하기</p>}
            {step === 2 && <p>관심학교 설정하기</p>}
            {step === 3 && <p>나의 직업 설정하기</p>}
            <S.CloseModalBtn onClick={() => history.push("/")}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          {step === 1 && (
            <div>
              <S.GreetingMsg>
                <p>반갑습니다!</p>
                <p>기본 프로필을 작성해주세요</p>
              </S.GreetingMsg>
              <S.ModalContent>
                <InfoData
                  onChange={onChange}
                  onFileChange={onFileChange}
                  checkingNickname={checkingNickname}
                  inputData={inputData}
                />
              </S.ModalContent>
            </div>
          )}
          {step === 2 && (
            <div>
              <S.GreetingMsg>
                <p>사용자님 주변에 위치한</p>
                <p>관심있는 학교를 선택해주세요</p>
              </S.GreetingMsg>
              <S.ModalContent>{step === 2 && <SchoolSelect />}</S.ModalContent>
            </div>
          )}
          {step === 3 && (
            <div>
              <S.GreetingMsg>
                <p>사용자님은</p>
                <p>현재 어떤 분야에서 일하고 계신가요?</p>
              </S.GreetingMsg>
              <S.ModalContent>{step === 3 && <JobSelect />}</S.ModalContent>
            </div>
          )}
          <S.NextBtn
            onClick={() => {
              if (step === 1) setStep(2);
              else if (step === 2) setStep(3);
              else if (step === 3) setStep(4);
            }}
          >
            다음
          </S.NextBtn>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
