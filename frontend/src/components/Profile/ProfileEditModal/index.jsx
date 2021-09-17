import React, { useEffect, useState } from "react";
import { schoolGetApi } from "../../../utils/schoolApi";
import { editMyInfo, getMyInfo } from "../../../utils/profileApi";
import { LoadingSpinner } from "../../Common";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";
import PProfileEditModal from "./PProfileEditModal";
import Portal from "../../Common/Modal/Portal";
import * as S from "../style";

export default function ProfileEditModal({ setModalSwitch }) {
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();
  const [schoollist, setSchoolList] = useState([]);
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    await getMyInfo().then((res) => {
      setUserData(res.data);
    });
  };
  const getSchoolInfo = async () => {
    await schoolGetApi().then((res) => {
      setSchoolList(res.data);
    });
  };
  const editUserDataHandler = async (inputs, newImg, basicImg) => {
    await editMyInfo(inputs, newImg, basicImg).then(async (res) => {
      const user_cp = { ...user };
      user_cp["schoolId"] = parseInt(inputs.schoolId);
      user_cp["name"] = inputs.new_nickname;
      setUser(user_cp);
      history.push(`/user/${inputs.new_nickname}`);
    });
  };
  const closeModal = () => {
    setModalSwitch(false);
  };
  useEffect(() => {
    getUserData();
    getSchoolInfo();
  }, []);

  return (
    <>
      {userData ? (
        <Portal>
          <S.ModalBackground>
            <S.ModalBox>
              <S.ModalHeader>
                <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
              </S.ModalHeader>
              <S.ModalContent>
                <PProfileEditModal
                  setModalSwitch={setModalSwitch}
                  schoollist={schoollist}
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
