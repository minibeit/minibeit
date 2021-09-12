import React, { useEffect, useState } from "react";
import { bprofileJoin, bprofileJoinDel, getBPusergroup } from "../../../utils";
import PBProfileJoin from "./PBProfileJoin";

export default function BProfileJoin({ businessId }) {
  const [usergroup, setUsergroup] = useState([]);
  const handleJoin = async (nickname) => {
    await bprofileJoin(businessId, nickname)
      .then(async () => {
        alert("초대되었습니다");
        getUsergroup();
      })
      .catch((err) => console.log(err));
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
  useEffect(() => {
    getUsergroup();
  }, []);
  return (
    <>
      <PBProfileJoin
        handleJoin={handleJoin}
        handleDelete={handleDelete}
        usergroup={usergroup}
      />
    </>
  );
}
