import React, { useEffect, useState } from "react";
import { editMyInfo, getMyInfo } from "../../../../utils/profileApi";
import { LoadingSpinner } from "../../../Common";
import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";
import Presenter from "./presenter";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "../../../Common/Modal/Portal";
import * as S from "../../style";

export default function ProfileEditModal({ setModalSwitch }) {
  const [user, setUser] = useRecoilState(userState);
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    await getMyInfo().then((res) => {
      setUserData(res.data);
    });
  };

  const editUserDataHandler = async (
    inputs,
    school,
    schoolDefault,
    newImg,
    basicImg
  ) => {
    if (school === null) {
      await editMyInfo(inputs, schoolDefault, newImg, basicImg).then(
        async (res) => {
          const user_cp = { ...user };
          user_cp["name"] = inputs.new_nickname;
          user_cp["avatar"] =
            res.data.avatar === null ? "noImg" : res.data.avatar;
          setUser(user_cp);
          window.alert("회원정보가 수정되었습니다.");
          window.location.replace(`/user/${inputs.new_nickname}`);
          setModalSwitch(false);
        }
      );
    } else {
      await editMyInfo(inputs, school, newImg, basicImg).then(async (res) => {
        const user_cp = { ...user };
        user_cp["schoolId"] = parseInt(school);
        user_cp["name"] = inputs.new_nickname;
        user_cp["avatar"] =
          res.data.avatar === null ? "noImg" : res.data.avatar;
        setUser(user_cp);
        window.alert("회원정보가 수정되었습니다.");
        window.location.replace(`/user/${inputs.new_nickname}`);
        setModalSwitch(false);
      });
    }
  };
  const closeModal = () => {
    setModalSwitch(false);
  };
  useEffect(() => {
    getUserData();
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
                <Presenter
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
