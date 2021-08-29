import React from "react";
import { bprofileJoin } from "../../../utils";
import PBProfileJoin from "./PBProfileJoin";

export default function BProfileJoin({ businessId }) {
  const handleJoin = async (nickname) => {
    try {
      const result = await bprofileJoin(businessId, nickname);
      console.log(result);
      const data = result.data;
      if (data) {
        //받은 데이터에 대하여 처리하기
        alert("초대되었습니다");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <PBProfileJoin handleJoin={handleJoin} />
    </>
  );
}
