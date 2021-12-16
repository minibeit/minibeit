import React, { useState } from "react";
import { editMyInfo } from "../../../../utils/profileApi";

import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";
import Presenter from "./presenter";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";
import Portal from "../../../Common/Modal/Portal";
import * as S from "./style";
import { nickCheckApi } from "../../../../utils/auth";
import {
  checkPhoneApi,
  checkCodeApi,
  checkEmailApi,
} from "../../../../utils/verificationApi";
import { toast } from "react-toastify";

export default function UserInfoEditModal({
  infoData,
  getUserData,
  setModalSwitch,
}) {
  const [userData, setUserData] = useState(infoData);
  const [originalNickname] = useState(userData.nickname);
  const [changeNickname, setChangeNickname] = useState(true);
  const [newPhone, setNewPhone] = useState();
  const [changePhone, setChangePhone] = useState(true);
  const [newEmail, setNewEmail] = useState();
  const [changeEmail, setChangeEmail] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const [schoolId, setSchoolId] = useState(user.schoolId);

  const onChange = (e) => {
    const { value, name } = e.target;
    const copy = { ...userData };
    copy[name] = value;
    setUserData(copy);
  };
  const onFileChange = (e) => {
    const copy = { ...userData };
    switch (e.target.id) {
      case "reset":
        copy.avatar = null;
        setUserData(copy);
        break;
      case "upload":
        copy.avatar = e.target.files[0];
        setUserData(copy);
        break;
      default:
        return;
    }
  };

  const checkingNickname = (nickname) => {
    nickCheckApi(nickname)
      .then((res) => {
        toast.info("사용가능한 아이디 입니다");
        let copy = { ...userData };
        copy.nickname = nickname;
        setUserData(copy);
        setChangeNickname(true);
      })
      .catch((err) => alert(err.response.data.error.info));
  };

  const checkingPhone = (phoneNum) => {
    checkPhoneApi(userData.id, phoneNum)
      .then((res) => {
        toast.info("인증번호를 발송했습니다");
        setNewPhone(phoneNum);
      })
      .catch(() => toast.info("휴대전화 형식을 다시한번 확인해주세요"));
  };

  const closeModal = () => {
    setModalSwitch(false);
  };

  const checkingEmail = (email) => {
    checkEmailApi(userData.id, email)
      .then((res) => {
        toast.info("인증번호를 발송했습니다");
        setNewEmail(email);
      })
      .catch(() => toast.info("이메일 형식을 다시한번 확인해주세요"));
  };

  const checkingCode = (code, type) => {
    checkCodeApi(code, userData.id, type)
      .then((res) => {
        let copy = { ...userData };
        if (type === "EMAIL") {
          setChangeEmail(true);
          copy.email = newEmail;
          setUserData(copy);
        } else {
          setChangePhone(true);
          copy.phoneNum = newPhone;
          setUserData(copy);
        }
        toast.info("인증 완료");
      })
      .catch(() => toast.error("인증번호가 잘못되었습니다."));
  };

  const submitEditUser = (userData, schoolId, newNickname) => {
    if (
      !userData.birth ||
      !userData.gender ||
      !userData.job ||
      !userData.name ||
      !userData.phoneNum
    ) {
      toast.info("정보를 확인해 주세요");
    } else if (!changeNickname) {
      toast.info("닉네임 중복확인을 해주세요");
    } else if (!changePhone) {
      toast.info("휴대폰 인증을 해주세요");
    } else if (!changeEmail) {
      toast.info("이메일 인증을 해주세요");
    } else {
      editMyInfo(userData, schoolId, originalNickname)
        .then((res) => {
          const copy = { ...user };
          copy.name = res.data.data.nickname;
          copy.schoolId = res.data.data.schoolId;
          setUser(copy);
          toast.info("수정이 완료되었습니다!");
          setModalSwitch(false);
          getUserData();
        })
        .catch((err) => toast.info("수정 내용을 다시 한번 확인해주세요"));
    }
  };

  return (
    <>
      {userData && (
        <Portal>
          <S.ModalBackground>
            <S.ModalBox>
              <S.ModalHeader>
                <p>내 프로필 수정하기</p>
                <S.CloseModalBtn onClick={() => closeModal()}>
                  <CloseIcon />
                </S.CloseModalBtn>
              </S.ModalHeader>
              <S.ModalContent>
                <Presenter
                  userData={userData}
                  onChange={onChange}
                  onFileChange={onFileChange}
                  schoolId={schoolId}
                  setSchoolId={setSchoolId}
                  checkingNickname={checkingNickname}
                  changeNickname={changeNickname}
                  setChangeNickname={setChangeNickname}
                  checkingPhone={checkingPhone}
                  changePhone={changePhone}
                  setChangePhone={setChangePhone}
                  changeEmail={changeEmail}
                  checkingEmail={checkingEmail}
                  setChangeEmail={setChangeEmail}
                  checkingCode={checkingCode}
                  submitEditUser={submitEditUser}
                />
              </S.ModalContent>
              <S.SubmitBtnBox>
                <button onClick={() => submitEditUser(userData, schoolId)}>
                  수정 완료
                </button>
              </S.SubmitBtnBox>
            </S.ModalBox>
          </S.ModalBackground>
        </Portal>
      )}
    </>
  );
}
