import React, { useEffect, useState } from "react";
import PUserInfo from "./PUserInfo";
import { getMyInfo } from "../../../utils/userInfo";
import { LoadingSpinner } from "../../Common";

export default function UserInfo() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    getMyInfo()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>{userData ? <PUserInfo userData={userData} /> : <LoadingSpinner />}</>
  );
}
