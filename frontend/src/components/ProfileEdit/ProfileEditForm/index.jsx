import React, { useEffect, useState } from "react";
import { schoolGetApi } from "../../../utils/schoolApi";
import { getMyInfo } from "../../../utils/userInfo";
import PProfileEditForm from "./PProfileEditForm";
import { LoadingSpinner } from "../../Common";

export default function ProfileEditForm() {
  const [schoollist, setSchoolList] = useState([]);
  const [userData, setUserData] = useState();
  const getUserData = async () => {
    await getMyInfo().then((res) => {
      setUserData(res.data);
    });
  };
  const getSchoolInfo = async () => {
    await schoolGetApi().then((res) => {
      setSchoolList(res.data);
    });
  };

  useEffect(() => {
    getUserData();
    getSchoolInfo();
  }, []);

  return (
    <>
      {userData ? (
        <PProfileEditForm schoollist={schoollist} userData={userData} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
