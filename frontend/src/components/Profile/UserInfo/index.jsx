import React, { useEffect, useState } from "react";
import PUserInfo from "./PUserInfo";
import { getMyInfo } from "../../../utils/userInfo";

export default function UserInfo() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getMyInfo()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <PUserInfo userData={userData} />;
}
