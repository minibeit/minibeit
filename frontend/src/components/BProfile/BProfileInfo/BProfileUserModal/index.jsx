import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  bprofileJoin,
  bprofileJoinDel,
  getBPusergroup,
} from "../../../../utils";
import { useRecoilValue } from "recoil";

import { assignChange } from "../../../../utils/bprofileApi";

import Presenter from "./presenter";
import { userState } from "../../../../recoil/userState";
import Portal from "../../../Common/Modal/Portal";
import * as S from "./style";
import { useHistory } from "react-router";

export default function BProfileUserModal({ businessId, setModalSwitch }) {
  const history = useHistory();
  const [userGroup, setUserGroup] = useState([]);
  const [, setNickname] = useState("");
  const [state, setState] = useState("None");
  const [cheifId, setCheifId] = useState();
  const currentUser = useRecoilValue(userState).name;

  const handleJoin = (userId) => {
    if (userId === "") {
      alert("닉네임을 입력한 후 초대해 주세요");
    } else {
      bprofileJoin(businessId, userId)
        .then(() => {
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

  const handleAssign = (userId) => {
    if (userId === undefined) {
    } else {
      assignChange(businessId, userId)
        .then(() => {
          alert("관리자가 양도되었습니다");
          setModalSwitch(false);
          history.push("/businesstest/" + businessId);
        })
        .catch((err) => alert("관리자가 양도되었습니다"));
    }
  };

  const getUsergroup = useCallback(() => {
    getBPusergroup(businessId)
      .then((res) => setUserGroup(res.data.data))
      .catch();
  }, [businessId]);

  useEffect(() => {
    getUsergroup();
  }, [getUsergroup]);

  return (
    <Portal>
      <S.ModalBackground>
        <S.ModalBox>
          <S.ModalHeader>
            <p>소속인원 목록</p>
            <S.CloseModalBtn onClick={() => setModalSwitch(false)}>
              <CloseIcon />
            </S.CloseModalBtn>
          </S.ModalHeader>
          <S.ModalContent>
            <Presenter
              handleJoin={handleJoin}
              usergroup={userGroup}
              state={state}
              setState={setState}
              cheifId={cheifId}
              setCheifId={setCheifId}
              currentUser={currentUser}
              handleAssign={handleAssign}
              handleDelete={handleDelete}
              setNickname={setNickname}
            />
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
