import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { geustState, userState } from "../../recoil/userState";

function ProcessLogin({ match }) {
  const [, setUser] = useRecoilState(userState);
  const [, setGuest] = useRecoilState(geustState);
  const [data] = useState({
    isLogin: true,
    id: parseInt(match.params.id),
    name: match.params.nickname,
    didSignup: JSON.parse(match.params.signupCheck),
    schoolId: parseInt(match.params.schoolId),
    bpId: 0,
  });

  const signupCheck = useCallback(() => {
    if (data.didSignup) {
      localStorage.setItem("accessToken", match.params.accessToken);
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
        <Redirect to="/signupInfo"></Redirect>
      )}
    </>
  );
}
export default ProcessLogin;
