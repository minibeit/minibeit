import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ReactComponent as CloseIcon } from "../../../../svg/엑스.svg";

import {
  bprofileJoin,
  bprofileJoinDel,
  getBPusergroup,
} from "../../../../utils";
import { assignChange } from "../../../../utils/bprofileApi";
import Portal from "../../../Common/Modal/Portal";
import { toast } from "react-toastify";

import Presenter from "./presenter";
import * as S from "./style";

export default function BProfileUserModal({ businessId, setModalSwitch }) {
  const history = useHistory();
  const [bisnessUsers, setBisnessUsers] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [searchUser, setSearchUser] = useState();
  const [editUserMode, setEditUserMode] = useState(false);
  const [editCheifMode, setEditCheifMode] = useState(false);

  const getUsergroup = useCallback(() => {
    getBPusergroup(businessId)
      .then((res) => setBisnessUsers(res.data.data))
      .catch(() => toast.error("비즈니스 유저 리스트를 불러오지 못했습니다"));
  }, [businessId]);

  const addUser = (user) => {
    if (!user) {
      toast.info("닉네임을 입력한 후 초대해 주세요");
    } else {
      bprofileJoin(businessId, user.value)
        .then(() => {
          toast.info("초대되었습니다");
          getUsergroup();
        })
        .catch((err) => toast.error("초대가 불가능한 유저입니다"));
    }
  };
  const [exceptUser, setExceptUser] = useState(false);
  const [secondAlert, setSecondAlert] = useState(false);
  const [user, setUser] = useState("");

  const deleteUser = (user) => {
    bprofileJoinDel(businessId, user.id)
      .then(() => {
        setSecondAlert(true);
        getUsergroup();
      })
      .catch((err) => {
        if (
          err.response.data.error.type ===
          "BusinessProfileAdminCantCancelException"
        ) {
          toast.error("관리자 유저는 제외시킬 수 없습니다");
        } else {
          toast.error("제외시킬 수 없는 유저입니다");
        }
      });
  };
  const [askChangeAdmin, setchangeAdmin] = useState(false);
  const changeAdmin = (user) => {
    if (user !== "") {
      assignChange(businessId, user.id)
        .then(() => {
          toast.info("관리자가 양도되었습니다");
          setEditCheifMode(!editCheifMode);
          setModalSwitch(false);
          setchangeAdmin(false);
          history.push("/business/" + businessId);
          history.go(0);
        })
        .catch((err) => toast.error("관리자가 될 수 없는 유저입니다"));
    } else {
      setAdminName("");
    }
  };

  useEffect(() => {
    getUsergroup();
  }, [getUsergroup]);

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>소속인원 목록</p>
          <S.CloseModalBtn onClick={() => setModalSwitch(false)}>
            <CloseIcon />
          </S.CloseModalBtn>
        </S.ModalHeader>
        <S.ModalContent>
          <Presenter
            bisnessUsers={bisnessUsers}
            addUser={addUser}
            deleteUser={deleteUser}
            changeAdmin={changeAdmin}
            adminName={adminName}
            setAdminName={setAdminName}
            searchUser={searchUser}
            setSearchUser={setSearchUser}
            editUserMode={editUserMode}
            setEditUserMode={setEditUserMode}
            editCheifMode={editCheifMode}
            setEditCheifMode={setEditCheifMode}
            setExceptUser={setExceptUser}
            secondAlert={secondAlert}
            setSecondAlert={setSecondAlert}
            exceptUser={exceptUser}
            askChangeAdmin={askChangeAdmin}
            setchangeAdmin={setchangeAdmin}
            user={user}
            setUser={setUser}
          />
        </S.ModalContent>
      </S.ModalBox>
    </Portal>
  );
}
