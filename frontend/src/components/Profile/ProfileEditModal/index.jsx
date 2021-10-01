import React, { useEffect, useState } from "react";
import { editMyInfo, getMyInfo } from "../../../utils/profileApi";
import { LoadingSpinner } from "../../Common";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";
import PProfileEditModal from "./PProfileEditModal";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "../../Common/Modal/Portal";
import * as S from "../style";

export default function ProfileEditModal({ setModalSwitch }) {
  const [user, setUser] = useRecoilState(userState);
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    await getMyInfo().then((res) => {
      console.log(res);
      setUserData(res.data);
    });
  };

  const editUserDataHandler = async (inputs, school, newImg, basicImg) => {
    await editMyInfo(inputs, school, newImg, basicImg).then(async (res) => {
      console.log(res);
      const user_cp = { ...user };
      user_cp["schoolId"] = parseInt(school);
      user_cp["name"] = inputs.new_nickname;
      setUser(user_cp);
      console.log(setUser);
      window.alert("회원정보가 수정되었습니다.");
      window.location.replace(`/user/${inputs.new_nickname}`);
      setModalSwitch(false);
    });
  };
  const closeModal = () => {
    setModalSwitch(false);
  };
  useEffect(() => {
    getUserData();
    console.log(userData);
  }, []);

  return (
    <>
      {userData ? (
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
                <PProfileEditModal
                  userData={userData}
                  editUserDataHandler={editUserDataHandler}
                />
              </S.ModalContent>
            </S.ModalBox>
          </S.ModalBackground>
        </Portal>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
