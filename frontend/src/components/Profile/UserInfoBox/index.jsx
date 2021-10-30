import React, { useEffect, useState } from "react";
import { getMyInfo } from "../../../utils/profileApi";
import { LoadingSpinner } from "../../Common";

import Presenter from "./presenter";

export default function UserInfoBox() {
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
    <>{userData ? <Presenter userData={userData} /> : <LoadingSpinner />}</>
  );
}
