import React, { useEffect, useState } from "react";
import { editMyInfo, getMyInfo } from "../../../../utils/profileApi";

import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";
import Presenter from "./presenter";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "../../../Common/Modal/Portal";
import * as S from "./style";
import { nickCheckApi } from "../../../../utils/auth";

export default function UserInfoEditModal({ setModalSwitch }) {
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    await getMyInfo().then((res) => {
      setUserData(res.data.data);
    });
  };

  const checkingNickname = (nickname) => {
    nickCheckApi(nickname)
      .then((res) => alert("사용가능한 아이디 입니다"))
      .catch((err) => alert(err.response.data.error.info));
  };

  const submitEditUser = (userData, schoolId, newNickname, imgChanged, img) => {
    editMyInfo(userData, schoolId, newNickname, imgChanged, img)
      .then((res) => console.log(res))
      .err((err) => console.log(err));
  };

  const closeModal = () => {
    setModalSwitch(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {userData && (
        <Portal>
          <S.ModalBackground>
            <S.ModalBox>
              <S.ModalHeader>
                <p>내 프로필 수정하기</p>
                <S.CloseModalBtn onClick={closeModal}>
                  <CloseIcon />
                </S.CloseModalBtn>
              </S.ModalHeader>
              <S.ModalContent>
                <Presenter
                  userData={userData}
                  setUserData={setUserData}
                  submitEditUser={submitEditUser}
                  checkingNickname={checkingNickname}
                />
              </S.ModalContent>
            </S.ModalBox>
          </S.ModalBackground>
        </Portal>
      )}
    </>
  );
}
