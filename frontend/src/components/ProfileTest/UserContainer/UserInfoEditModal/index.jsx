import React, { useEffect, useState } from "react";
import { editMyInfo, getMyInfo } from "../../../../utils/profileApi";

import { useRecoilState } from "recoil";
import { userState } from "../../../../recoil/userState";
import Presenter from "./presenter";
import CloseIcon from "@mui/icons-material/Close";
import Portal from "../../../Common/Modal/Portal";
import * as S from "./style";
import { nickCheckApi } from "../../../../utils/auth";
import { useHistory } from "react-router";

export default function UserInfoEditModal({ setModalSwitch }) {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [newNickname, setNewNickname] = useState();
  const [user, setUser] = useRecoilState(userState);
  const [schoolId, setSchoolId] = useState(user.schoolId);

  const getUserData = async () => {
    await getMyInfo().then((res) => {
      setUserData(res.data.data);
    });
  };
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
      .then((res) => alert("사용가능한 아이디 입니다"))
      .catch((err) => alert(err.response.data.error.info));
  };

  const submitEditUser = (userData, schoolId, newNickname) => {
    editMyInfo(userData, schoolId, newNickname)
      .then((res) => {
        const copy = { ...user };
        copy.name = res.data.data.nickname;
        copy.schoolId = res.data.data.schoolId;
        setUser(copy);
        alert("수정이 완료되었습니다!");
        closeModal();
        history.push(`/profile/${res.data.data.nickname}`);
        history.go(0);
      })
      .catch((err) => alert("수정 내용을 다시 한번 확인해주세요"));
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
                  onChange={onChange}
                  onFileChange={onFileChange}
                  newNickname={newNickname}
                  setNewNickname={setNewNickname}
                  schoolId={schoolId}
                  setSchoolId={setSchoolId}
                  checkingNickname={checkingNickname}
                  submitEditUser={submitEditUser}
                />
              </S.ModalContent>
            </S.ModalBox>
          </S.ModalBackground>
        </Portal>
      )}
    </>
  );
}
