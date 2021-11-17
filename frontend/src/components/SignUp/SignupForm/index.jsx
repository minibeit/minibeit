import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

import Portal from "../../Common/Modal/Portal";
import { nickCheckApi, signupInfoApi } from "../../../utils/auth";
import { signupState } from "../../../recoil/signupState";
import { geustState, userState } from "../../../recoil/userState";

import InfoData from "./InfoData";
import SchoolSelect from "./SchoolSelect";
import JobSelect from "./JobSelect";

import * as S from "./style";
import { checkCodeApi, verificationApi } from "../../../utils/mailApi";

export default function SignUpComponent({ setFinish }) {
  const [inputData, setInputData] = useRecoilState(signupState);
  const [, setLoginState] = useRecoilState(userState);
  const guest = useRecoilValue(geustState);
  const [step, setStep] = useState(1);
  const history = useHistory();
  const [nickNameCheck, setNickNameCheck] = useState();
  const [completeEmail, setCompleteEmail] = useState(true);

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
  const checkingEmail = (email) => {
    verificationApi(guest.accessToken, guest.id, email).then((res) => {
      if (res.status !== 200) alert("오류가 발생했습니다. 다시 시도해주세요");
      else {
        let copy = { ...inputData };
        copy.email = email;
        setInputData(copy);
      }
    });
  };
  const checkingCode = (code) => {
    checkCodeApi(guest.accessToken, code, guest.id, "EMAIL").then((res) => {
      if (res.status === 200) {
        alert("이메일 인증 성공!");
        setCompleteEmail(true);
      } else {
        alert("인증번호가 잘못되었습니다.");
      }
    });
  };

  const firstStep = () => {
    if (
      !inputData.name ||
      !inputData.gender ||
      !inputData.year ||
      !inputData.month ||
      !inputData.date
    ) {
      alert("정보를 확인해주세요");
      return false;
    } else if (!nickNameCheck) {
      alert("닉네임 중복을 확인해주세요");
      return false;
    } else if (!completeEmail) {
      alert("이메일을 확인해 주세요");
      return false;
    } else return true;
  };

  const nextStep = () => {
    if (step === 1) {
      if (firstStep()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (inputData.schoolId) {
        setStep(3);
      } else {
        alert("학교를 선택해주세요");
      }
    } else if (step === 3) setStep(4);
  };

  const onSubmit = () => {
    signupInfoApi(inputData, guest.accessToken)
      .then((res) => {
        const copy = { ...guest };
        localStorage.setItem("accessToken", guest.accessToken);
        delete copy.accessToken;
        copy.didSignup = true;
        copy.name = res.data.data.nickname;
        copy.schoolId = res.data.data.schoolId;
        copy.avatar =
          res.data.data.avatar === null ? "noImg" : res.data.data.avatar;
        setLoginState(copy);
        setFinish(true);
      })
      .catch((err) => {
        alert("회원가입에 실패하였습니다. 잠시후에 다시 시도해주세요");
      });
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            {step === 1 && (
              <>
                <div>1</div>
                <p>프로필 작성하기</p>
              </>
            )}
            {step === 2 && (
              <>
                <div>2</div>
                <p>관심학교 설정하기</p>
              </>
            )}
            {step === 3 && (
              <>
                <div>3</div>
                <p>나의 직업 설정하기</p>
              </>
            )}
            <S.CloseModalBtn onClick={() => history.push("/")}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ProgressBar>
            <S.StepBar step={step && step} />
          </S.ProgressBar>
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
                checkingEmail={checkingEmail}
                checkingCode={checkingCode}
                completeEmail={completeEmail}
                setCompleteEmail={setCompleteEmail}
              />
            )}
            {step === 2 && (
              <SchoolSelect inputData={inputData} setInputData={setInputData} />
            )}
            {step === 3 && (
              <JobSelect inputData={inputData} setInputData={setInputData} />
            )}
          </S.ModalContent>
          {step !== 3 ? (
            <S.NextBtn onClick={nextStep}>다음</S.NextBtn>
          ) : (
            <S.NextBtn onClick={onSubmit}>미니바이트 시작하기</S.NextBtn>
          )}
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
