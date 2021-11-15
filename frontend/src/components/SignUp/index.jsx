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
  const [nickNameCheck, setNickNameCheck] = useState();

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
    if (inputData.nickname) {
      nickCheckApi(inputData.nickname)
        .then((res) => {
          alert("사용가능한 아이디 입니다");
          setNickNameCheck(true);
        })
        .catch((err) => {
          alert("중복된 아이디 입니다");
          setNickNameCheck(false);
        });
    }
  };
  const firstStep = () => {
    if (
      inputData.name &&
      inputData.gender &&
      inputData.year &&
      inputData.month &&
      inputData.date &&
      inputData.phoneNum2.length > 4 &&
      inputData.phoneNum3.length > 4
    ) {
      return true;
    } else return false;
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
          <S.ModalContent>
            <S.GreetingMsg>
              {step === 1 && (
                <>
                  <p>반갑습니다!</p>
                  <p>기본 프로필을 작성해주세요</p>
                </>
              )}
              {step === 2 && (
                <>
                  <p>사용자님 주변에 위치한</p>
                  <p>관심있는 학교를 선택해주세요</p>
                </>
              )}
              {step === 3 && (
                <>
                  <p>사용자님은</p>
                  <p>현재 어떤 분야에서 일하고 계신가요?</p>
                </>
              )}
            </S.GreetingMsg>

            {step === 1 && (
              <InfoData
                onChange={onChange}
                onFileChange={onFileChange}
                checkingNickname={checkingNickname}
                inputData={inputData}
                nickNameCheck={nickNameCheck}
              />
            )}
            {step === 2 && <SchoolSelect />}
            {step === 3 && <JobSelect />}
          </S.ModalContent>
          <S.NextBtn
            onClick={() => {
              if (step === 1) {
                if (firstStep()) {
                  if (nickNameCheck) {
                    setStep(2);
                  } else {
                    alert("닉네임 중복을 확인해주세요");
                  }
                } else {
                  alert("정보를 확인해주세요");
                }
              } else if (step === 2) setStep(3);
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
