import React, { useEffect, useState } from "react";
import { bprofileJoin, bprofileJoinDel, getBPusergroup } from "../../../utils";
import Portal from "../../Common/Modal/Portal";
import PBProfileJoin from "./PBProfileJoin";
import * as S from "../style";

export default function BProfileJoin({ businessId, setModalSwitch }) {
  const [usergroup, setUsergroup] = useState([]);
  const handleJoin = async (nickname) => {
    if (nickname === "") {
      window.alert("닉네임을 입력한 후 초대해 주세요");
    } else {
      await bprofileJoin(businessId, nickname)
        .then(async () => {
          alert("초대되었습니다");
          getUsergroup();
        })
        .catch((err) => console.log(err));
    }
  };
  const handleDelete = async (userId, userNickname) => {
    await bprofileJoinDel(businessId, userId)
      .then(async () => {
        alert(userNickname + "님의 초대가 취소되었습니다");
        getUsergroup();
      })
      .catch((err) => console.log(err));
  };
  const getUsergroup = async () => {
    await getBPusergroup(businessId)
      .then(async (res) => setUsergroup(res.data))
      .catch((err) => console.log(err));
  };
  const closeModal = () => {
    setModalSwitch(false);
  };
  useEffect(() => {
    getUsergroup();
  }, []);
  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <S.CloseModalBtn onClick={closeModal}>닫기</S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <PBProfileJoin
              handleJoin={handleJoin}
              handleDelete={handleDelete}
              usergroup={usergroup}
            />
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
