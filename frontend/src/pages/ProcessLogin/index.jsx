import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

function ProcessLogin({ match }) {
  console.log("hehe");
  localStorage.setItem("accessToken", match.params.accessToken);
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    setUser({
      isLogin: true,
      id: parseInt(match.params.id),
      name: match.params.nickname,
      didSignup: match.params.signupCheck === "true",
      schoolId: parseInt(match.params.schoolId),
    });
  }, []);
  console.log(user);
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
export default ProcessLogin;
