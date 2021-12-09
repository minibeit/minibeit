import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { geustState, userState } from "../../recoil/userState";

function ProcessLogin({ match }) {
  const [, setUser] = useRecoilState(userState);
  const [, setGuest] = useRecoilState(geustState);
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
      axios.defaults.headers.common["Authorization"] = match.params.accessToken;
      setUser(data);
    } else {
      data.accessToken = match.params.accessToken;
      setGuest(data);
    }
  }, [data, match.params.accessToken, setGuest, setUser]);

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
