import React from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { geustState, userState } from "../../recoil/userState";

function ProcessLogin({ match }) {
  const [user, setUser] = useRecoilState(userState);
  const [guest, setGuest] = useRecoilState(geustState);

  const data = {
    isLogin: true,
    id: parseInt(match.params.id),
    name: match.params.nickname,
    didSignup: JSON.parse(match.params.signupCheck),
    schoolId: parseInt(match.params.schoolId),
  };
  if (data.didSignup) {
    localStorage.setItem("accessToken", match.params.accessToken);
    setUser(data);
  } else {
    data.accessToken = match.params.accessToken;
    setGuest(data);
  }
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
