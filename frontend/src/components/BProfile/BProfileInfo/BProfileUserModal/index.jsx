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
  const [bisnessUsers, setBisnessUsers] = useState([]);
  const [, setNickname] = useState("");
  const [state, setState] = useState("None");
  const [cheifId, setCheifId] = useState();
  const currentUser = useRecoilValue(userState).name;

  const addUser = (user) => {
    if (!user) {
      alert("닉네임을 입력한 후 초대해 주세요");
    } else {
      bprofileJoin(businessId, user.value)
        .then(() => {
          alert("초대되었습니다");
          getUsergroup();
        })
        .catch((err) => alert("초대가 불가능한 유저입니다"));
    }
  };

  const deleteUser = (user) => {
    bprofileJoinDel(businessId, user.id)
      .then(() => {
        alert(user.nickname + "님이 그룹에서 제외되었습니다");
        getUsergroup();
      })
      .catch((err) => {
        if (
          err.response.data.error.type ===
          "BusinessProfileAdminCantCancelException"
        ) {
          alert("관리자 유저는 제외시킬 수 없습니다");
        } else {
          alert("제외시킬 수 없는 유저입니다");
        }
      });
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
      .then((res) => setBisnessUsers(res.data.data))
      .catch(() => alert("비즈니스 유저 리스트를 불러오지 못했습니다"));
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
              addUser={addUser}
              bisnessUsers={bisnessUsers}
              deleteUser={deleteUser}
              state={state}
              setState={setState}
              cheifId={cheifId}
              setCheifId={setCheifId}
              currentUser={currentUser}
              handleAssign={handleAssign}
              setNickname={setNickname}
            />
          </S.ModalContent>
        </S.ModalBox>
      </S.ModalBackground>
    </Portal>
  );
}
