import React, { useEffect, useState } from "react";
import PUserInfo from "./PUserInfo";
import axios from "axios";

export default function UserInfo() {
  const [dummyData, setDummyData] = useState({});
  useEffect(() => {
    //지금은 public의 더미데이터 사용중
    //getUserInfo api완성되면 수정
    axios.get("/dummydata.json").then(async (res) => {
      await setDummyData(res.data);
    });
  });
  return <PUserInfo dummyData={dummyData} />;
}
