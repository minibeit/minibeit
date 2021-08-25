import React from "react";
import { Redirect } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

export default function ProcessLogin({ match }) {
  //파라미터 수정되면 수정해야함
  //라우트 여러가지 다시 설정
  //내생각 카카오로 로그인을 했을 때 이사람이 guest면 /signupinfo로 이동시킴
  //guest가 아니라면 즉 정보가 있다면 로그인 상태로 활동할 수 있게 함
  const accessToken = match.params.token.split("=", 2)[1];
  const id = match.params.id.split("=", 2)[1];
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("id", id);
  const setUserState = useSetRecoilState(userState);
  setUserState({
    isLogin: true,
    name: null,
  });

  return <Redirect to="/signupinfo"></Redirect>;
}
