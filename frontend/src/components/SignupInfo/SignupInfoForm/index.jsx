import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";
import PSignupInfoForm from "./PSignupInfoForm";
import { schoolGetApi } from "../../../utils/schoolApi";
import { signupInfoApi } from "../../../utils/auth";

export default function SignupForm() {
  const history = useHistory();
  const [loginState, setLoginState] = useRecoilState(userState);
  const [schoollist, setSchoolList] = useState([]);

  const getSchoolInfo = async () => {
    try {
      const result = await schoolGetApi();
      if (result) {
        setSchoolList(result.data);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };

  useEffect(() => {
    getSchoolInfo();
  }, []);

  const signupHandler = async (inputs) => {
    try {
      const result = await signupInfoApi(inputs);
      console.log(result);
      const data = result.data;
      if (data) {
        window.alert("회원가입에 성공!");
        setLoginState({
          ...loginState,
          didSignup: true,
          name: data.nickname,
          schoolId: data.schoolId,
        });
        localStorage.setItem("userId", data.id);
        history.push("/");
      }
    } catch (e) {
      // 아이디 중복확인 api 만들어지면 수정!!
      if (e.response.data.error) {
        alert("아이디가 중복되었습니다.");
      }
    }
  };
  return (
    <PSignupInfoForm schoollist={schoollist} signupHandler={signupHandler} />
  );
}
