import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useHistory } from "react-router";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

import Portal from "../../Common/Modal/Portal";
import { nickCheckApi, signupInfoApi } from "../../../utils/auth";
import { signupState } from "../../../recoil/signupState";
import { guestState, userState } from "../../../recoil/userState";
import toast from "react-hot-toast";

import InfoData from "./InfoData";
import SchoolSelect from "./SchoolSelect";
import JobSelect from "./JobSelect";

import * as S from "./style";
import {
  guestCheckPhoneApi,
  guestCheckCodeApi,
  guestCheckEmailApi,
} from "../../../utils/verificationApi";

export default function SignUpComponent({ setFinish }) {
  const [inputData, setInputData] = useRecoilState(signupState);
  const [, setUser] = useRecoilState(userState);
  const guest = useRecoilValue(guestState);
  const resetGuest = useResetRecoilState(guestState);
  const [step, setStep] = useState(1);
  const history = useHistory();
  const [changeNickname, setChangeNickname] = useState(false);
  const [changePhone, setChangePhone] = useState(false);
  const [newPhone, setNewPhone] = useState();
  const [changeEmail, setChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState();

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
  const checkingNickname = (nickname) => {
    if (nickname) {
      nickCheckApi(nickname)
        .then((res) => {
          toast.success("사용가능한 아이디 입니다");
          let copy = { ...inputData };
          copy.nickname = nickname;
          setInputData(copy);
          setChangeNickname(true);
        })
        .catch((err) => {
          toast.error("중복된 아이디 입니다");
        });
    }
  };
  const checkingPhone = (phoneNum) => {
    guestCheckPhoneApi(guest.accessToken, guest.id, phoneNum).then((res) =>
      setNewPhone(phoneNum)
    );
  };
  const checkingEmail = (email) => {
    guestCheckEmailApi(guest.accessToken, guest.id, email).then((res) =>
      setNewEmail(email)
    );
  };
  const checkingCode = (code, type) => {
    guestCheckCodeApi(guest.accessToken, code, guest.id, type).then((res) => {
      if (res.status === 200) {
        toast.success("인증 성공!");
        let copy = { ...inputData };
        if (type === "EMAIL") {
          setChangeEmail(true);
          copy.email = newEmail;
          setInputData(copy);
        } else if (type === "PHONE") {
          setChangePhone(true);
          copy.phoneNum = newPhone;
          setInputData(copy);
        }
      } else {
        toast.error("인증번호가 잘못되었습니다.");
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
      toast.error("정보를 확인해주세요");
      return false;
    } else if (!changeNickname) {
      toast.error("닉네임 중복을 확인해주세요");
      return false;
    } else if (!changePhone) {
      toast.error("연락처를 확인해 주세요");
      return false;
    } else if (!changeEmail) {
      toast.error("이메일을 확인해 주세요");
      return false;
    } else return true;
  };

  const nextStep = () => {
    if (step === 1) {
      if (firstStep()) {
        if (!inputData.email) {
          const copy = { ...inputData };
          copy.email = guest.email;
          setInputData(copy);
        }
        setStep(2);
      }
    } else if (step === 2) {
      if (inputData.schoolId) {
        setStep(3);
      } else {
        toast.error("학교를 선택해주세요");
      }
    } else if (step === 3) setStep(4);
  };

  const onSubmit = () => {
    signupInfoApi(inputData, guest.accessToken)
      .then((res) => {
        axios.defaults.headers.common["Authorization"] = guest.accessToken;
        setUser({
          avatar:
            res.data.data.avatar === null ? "noImg" : res.data.data.avatar,
          isLogin: true,
          schoolId: res.data.data.schoolId,
        });
        resetGuest();
        setFinish(true);
      })
      .catch((err) => {
        toast.error("회원가입에 실패하였습니다. 잠시후에 다시 시도해주세요");
      });
  };

  useEffect(() => {
    if (guest.email) {
      setChangeEmail(true);
    }
  }, [guest.email]);

  return (
    <Portal>
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
              inputData={inputData}
              setInputData={setInputData}
              defaultEmail={guest.email}
              checkingNickname={checkingNickname}
              checkingEmail={checkingEmail}
              checkingCode={checkingCode}
              checkingPhone={checkingPhone}
              changeNickname={changeNickname}
              setChangeNickname={setChangeNickname}
              changePhone={changePhone}
              setChangePhone={setChangePhone}
              changeEmail={changeEmail}
              setChangeEmail={setChangeEmail}
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
    </Portal>
  );
}
