import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

export default function ProcessLogin({ match }) {
  localStorage.setItem("accessToken", match.params.token);
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    setUser({
      isLogin: true,
      id: parseInt(match.params.id),
      name: match.params.name,
      didSignup: JSON.parse(match.params.didSignup),
    });
  }, []);
  return (
    <>
      {user.didSignup === "true" ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Redirect to="/signupInfo"></Redirect>
      )}
    </>
  );
}
