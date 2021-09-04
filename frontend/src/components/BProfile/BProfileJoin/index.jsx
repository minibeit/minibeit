import React, { useState } from "react";
import { bprofileJoin, bprofileJoinDel } from "../../../utils";
import PBProfileJoin from "./PBProfileJoin";

export default function BProfileJoin({ businessId }) {
  const [usergroup, setUsergroup] = useState([]);
  const handleJoin = async (nickname) => {
    try {
      const result = await bprofileJoin(businessId, nickname);
      console.log(result);
      const data = result.data;
      if (data) {
        //받은 데이터에 대하여 처리하기
        alert("초대되었습니다");
        console.log(data);
        setUsergroup(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (userId) => {
    try {
      const result = await bprofileJoinDel(businessId, userId);
      console.log(result);
      const data = result.data;
      if (data) {
        //받은 데이터에 대하여 처리하기
        alert("초대가 취소되었습니다");
        console.log(data);
        setUsergroup(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
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
