import React, { useState } from "react";
import { useHistory } from "react-router";

import { useRecoilState, useRecoilValue } from "recoil";
import { geustState, userState } from "../../../recoil/userState";
import PSignupInfoForm from "./PSignupInfoForm";
import { signupInfoApi } from "../../../utils/auth";
import SignupFinish from "../SignupFinish";

export default function SignupForm() {
  const history = useHistory();
  const [, setLoginState] = useRecoilState(userState);
  const guest = useRecoilValue(geustState);

  const signupHandler = async (inputs2, img) => {
    await signupInfoApi(inputs2, img, guest.accessToken)
      .then((res) => {
        const guest_cp = { ...guest };
        localStorage.setItem("accessToken", guest.accessToken);
        delete guest_cp.accessToken;
        guest_cp.didSignup = true;
        guest_cp.name = res.data.nickname;
        guest_cp.schoolId = res.data.schoolId;
        guest_cp.avatar = res.data.avatar === null ? "noImg" : res.data.avatar;
        setLoginState(guest_cp);
        history.push("/");
        setModalSwitch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [modalSwitch, setModalSwitch] = useState(false);
  return (
    <>
      <PSignupInfoForm signupHandler={signupHandler} />
      {modalSwitch ? <SignupFinish setModalSwitch={setModalSwitch} /> : null}
    </>
  );
}
