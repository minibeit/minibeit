import React, { useEffect, useState } from "react";
import { editBprofile, getBprofileInfo } from "../../../utils/bprofileApi";
import PBProfileEditCont from "./PBProfileEditCont";

export default function BProfileEditCont({ businessId }) {
  const [buserData, setBUserData] = useState({
    name: "",
    category: "",
    place: "",
    introduce: "",
    contact: "",
  });
  useEffect(() => {
    getBprofileInfo(businessId)
      .then((res) => {
        console.log(res.data);
        setBUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(buserData);
  const bpEditHandler = async (inputs) => {
    try {
      const result = await editBprofile(businessId, inputs);
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
  const name = buserData.name;
  const category = buserData.category;
  const place = buserData.place;
  const introduce = buserData.introduce;
  const contact = buserData.contact;

  return (
    <>
      <PBProfileEditCont
        name={name}
        category={category}
        place={place}
        introduce={introduce}
        category={category}
        bpEditHandler={bpEditHandler}
      />
    </>
  );
}
