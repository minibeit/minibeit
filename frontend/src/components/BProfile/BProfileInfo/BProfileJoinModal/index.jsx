import React, { useCallback, useEffect, useState } from "react";
import {
  bprofileJoin,
  bprofileJoinDel,
  getBPusergroup,
} from "../../../../utils";
import { useRecoilValue } from "recoil";

import { assignChange } from "../../../../utils/bprofileApi";

import Presenter from "./presenter";
import { userState } from "../../../../recoil/userState";

export default function BProfileJoin({ businessId, setModalSwitch }) {
  const [usergroup, setUsergroup] = useState([]);
  const [, setNickname] = useState("");
  const [state, setState] = useState("None");
  const [cheifId, setCheifId] = useState();
  const currentUser = useRecoilValue(userState).name;

  const handleJoin = async (userId) => {
    if (userId === "") {
      window.alert("닉네임을 입력한 후 초대해 주세요");
    } else {
      await bprofileJoin(businessId, userId)
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

  const handleAssign = async (userId) => {
    if (userId === undefined) {
    } else {
      await assignChange(businessId, userId)
        .then(async () => {
          alert("관리자가 양도되었습니다");
          window.location.replace("/business/" + businessId);
        })
        .catch((err) => console.log(err));
    }
  };

  const getUsergroup = useCallback(async () => {
    await getBPusergroup(businessId)
      .then(async (res) => setUsergroup(res.data.data))
      .catch((err) => console.log(err));
  }, [businessId]);

  const closeModal = () => {
    setModalSwitch(false);
  };

  useEffect(() => {
    getUsergroup();
  }, [getUsergroup]);

  return (
    <Presenter
      closeModal={closeModal}
      handleJoin={handleJoin}
      usergroup={usergroup}
      state={state}
      setState={setState}
      cheifId={cheifId}
      setCheifId={setCheifId}
      currentUser={currentUser}
      handleAssign={handleAssign}
      handleDelete={handleDelete}
      setNickname={setNickname}
    />
  );
}
