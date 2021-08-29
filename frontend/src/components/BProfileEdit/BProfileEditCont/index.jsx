import React, { useEffect, useState } from "react";
import { editBprofile, getBprofileInfo } from "../../../utils/bprofileApi";
import PBProfileEditCont from "./PBProfileEditCont";

export default function BProfileEditCont({ businessId }) {
  const bpEditHandler = async (inputs, img) => {
    try {
      const result = await editBprofile(businessId, inputs, img);
      console.log(result);
      const data = result.data;
      if (data) {
        console.log(data);
        window.location.replace("/business/" + businessId);
      }
    } catch (e) {
      // 아이디 중복확인 api 만들어지면 수정!!
      if (e.response.data.error) {
        alert("아이디가 중복되었습니다.");
      }
    }
  };

  return (
    <>
      <PBProfileEditCont
        businessId={businessId}
        bpEditHandler={bpEditHandler}
      />
    </>
  );
}
