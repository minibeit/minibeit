import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { useRecoilState, useRecoilValue } from "recoil";
import { geustState, userState } from "../../../recoil/userState";
import PSignupInfoForm from "./PSignupInfoForm";
import { schoolGetApi } from "../../../utils/schoolApi";
import { signupInfoApi } from "../../../utils/auth";

export default function SignupForm() {
  const history = useHistory();
  const [loginState, setLoginState] = useRecoilState(userState);
  const guest = useRecoilValue(geustState);
  const [schoollist, setSchoolList] = useState([]);

  const getSchoolInfo = async () => {
    try {
      const result = await schoolGetApi();
      if (result) {
        setSchoolList(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSchoolInfo();
  }, []);

  const signupHandler = async (inputs, img) => {
    try {
      const result = await signupInfoApi(inputs, img, guest.accessToken);
      const data = await result.data;
      if (data) {
        window.alert("회원가입에 성공!");
        const guest_cp = { ...guest };
        localStorage.setItem("accessToken", guest.accessToken);
        delete guest_cp.accessToken;
        guest_cp.didSignup = true;
        guest_cp.name = data.nickname;
        guest_cp.schoolId = data.schoolId;
        setLoginState(guest_cp);
        localStorage.setItem("userId", data.id);
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PSignupInfoForm schoollist={schoollist} signupHandler={signupHandler} />
  );
}
