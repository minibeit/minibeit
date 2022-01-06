import React, { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { guestState, userState } from "../../recoil/userState";

function ProcessLogin({ match }) {
  const [, setUser] = useRecoilState(userState);
  const [, setGuest] = useRecoilState(guestState);
  const [data] = useState({
    isLogin: true,
    id: parseInt(match.params.id),
    name: match.params.nickname,
    email: match.params.email === "null" ? null : match.params.email,
    didSignup: JSON.parse(match.params.signupCheck),
    schoolId: 0 /*parseInt(match.params.schoolId)*/,
    avatar:
      match.params.imgUrl1 !== "0"
        ? `https://${match.params.imgUrl1}/${match.params.imgUrl2}/${match.params.imgUrl3}`
        : "noImg",
  });

  const signupCheck = useCallback(() => {
    if (data.didSignup) {
      axios.defaults.headers.common["Authorization"] = match.params.accessToken;
      setUser({
        isLogin: true,
        schoolId: data.schoolId,
        avatar: data.avatar,
        bprofile: null,
      });
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
