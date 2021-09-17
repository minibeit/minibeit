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

  const signupHandler = async (inputs2, img) => {
    await signupInfoApi(inputs2, img, guest.accessToken)
      .then((res) => {
        window.alert("회원가입에 성공!");
        const guest_cp = { ...guest };
        localStorage.setItem("accessToken", guest.accessToken);
        delete guest_cp.accessToken;
        guest_cp.didSignup = true;
        guest_cp.name = res.data.nickname;
        guest_cp.schoolId = res.data.schoolId;
        setLoginState(guest_cp);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <PSignupInfoForm signupHandler={signupHandler} />;
}
