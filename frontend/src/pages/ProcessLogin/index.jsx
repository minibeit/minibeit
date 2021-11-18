import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signupState } from "../../recoil/signupState";
import { geustState, userState } from "../../recoil/userState";

function ProcessLogin({ match }) {
  const [, setUser] = useRecoilState(userState);
  const [, setGuest] = useRecoilState(geustState);
  const [signup, setSignup] = useRecoilState(signupState);
  const [data] = useState({
    isLogin: true,
    id: parseInt(match.params.id),
    name: match.params.nickname,
    email: match.params.email === "null" ? null : match.params.email,
    didSignup: JSON.parse(match.params.signupCheck),
    schoolId: parseInt(match.params.schoolId),
    bpId: 0,
    avatar:
      match.params.a !== "0"
        ? "https://" +
          match.params.a +
          "/" +
          match.params.b +
          "/" +
          match.params.c
        : "noImg",
  });
  const signupCheck = useCallback(() => {
    if (data.didSignup) {
      localStorage.setItem("accessToken", match.params.accessToken);
      setUser(data);
    } else {
      data.accessToken = match.params.accessToken;
      setGuest(data);
      let copy = { ...signup };
      copy.email = data.email;
      setSignup(copy);
    }
  }, [data, match.params.accessToken, setGuest, setUser, setSignup, signup]);

  useEffect(() => {
    signupCheck();
  }, [signupCheck]);
  return (
    <>
      {data.didSignup ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Redirect to="/signup"></Redirect>
      )}
    </>
  );
}
export default ProcessLogin;
