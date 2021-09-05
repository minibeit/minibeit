import React, { useEffect, useState } from "react";
import { bprofileJoin, bprofileJoinDel, getBPusergroup } from "../../../utils";
import PBProfileJoin from "./PBProfileJoin";

export default function BProfileJoin({ businessId }) {
  const [usergroup, setUsergroup] = useState([]);
  const handleJoin = async (nickname) => {
    try {
      const result = await bprofileJoin(businessId, nickname);
      if (result) {
        alert("초대되었습니다");
        getUsergroup();
      }
      //받은 데이터에 대하여 처리하기
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (userNickname) => {
    try {
      const result = await bprofileJoinDel(businessId, userNickname);
      if (result) {
        alert(userNickname + "님의 초대가 취소되었습니다");
        getUsergroup();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getUsergroup = async () => {
    try {
      const result = await getBPusergroup(businessId);
      console.log(result);
      const data = result.data;
      if (data) {
        setUsergroup(data);
      }
    } catch (e) {
      console.log(e);
    }
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
