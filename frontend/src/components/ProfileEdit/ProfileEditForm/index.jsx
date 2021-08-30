import React, { useEffect, useState } from "react";
import { schoolGetApi } from "../../../utils/schoolApi";
import { editMyInfo, getMyInfo } from "../../../utils/profileApi";
import PProfileEditForm from "./PProfileEditForm";
import { LoadingSpinner } from "../../Common";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";

export default function ProfileEditForm() {
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();
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
  const editUserDataHandler = async (inputs, newImg) => {
    await editMyInfo(inputs, newImg).then(async (res) => {
      const user_cp = { ...user };
      user_cp["schoolId"] = parseInt(inputs.schoolId);
      user_cp["name"] = inputs.new_nickname;
      setUser(user_cp);
      history.push(`/user/${inputs.new_nickname}`);
    });
  };

  useEffect(() => {
    getUserData();
    getSchoolInfo();
  }, []);

  return (
    <>
      {userData ? (
        <PProfileEditForm
          schoollist={schoollist}
          userData={userData}
          editUserDataHandler={editUserDataHandler}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
