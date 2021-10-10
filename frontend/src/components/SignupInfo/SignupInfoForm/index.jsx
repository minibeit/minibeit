import React, { useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { geustState, userState } from "../../../recoil/userState";
import PSignupInfoForm from "./PSignupInfoForm";
import { signupInfoApi } from "../../../utils/auth";
import SignupFinish from "../SignupFinish";

export default function SignupForm() {
  const [, setLoginState] = useRecoilState(userState);
  const guest = useRecoilValue(geustState);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [inputResult, setinputResult] = useState({});
  const signupHandler = async (inputs2, img) => {
    setinputResult({ ...inputs2, img: img });
    console.log(inputResult);
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
        setModalSwitch(true);
        console.log(modalSwitch);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {modalSwitch === true ? (
        <SignupFinish
          inputResult={inputResult}
          setModalSwitch={setModalSwitch}
        />
      ) : (
        <PSignupInfoForm signupHandler={signupHandler} />
      )}
    </>
  );
}
