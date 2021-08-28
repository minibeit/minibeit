import React from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

function ProcessLogin({ match }) {
  console.log(match);
  localStorage.setItem("accessToken", match.params.accessToken);
  const [user, setUser] = useRecoilState(userState);
  console.log(match.params.id);
  const data = {
    isLogin: true,
    id: parseInt(match.params.id),
    name: match.params.nickname,
    didSignup: JSON.parse(match.params.signupCheck),
    schoolId: parseInt(match.params.schoolId),
  };
  setUser(data);
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
