import React from "react";
import { useHistory } from "react-router-dom";
import PLoginForm from "./PLoginForm";
import { useRecoilState } from "recoil";
import { obtainToken } from "../../../utils";
import { userState } from "../../../recoil/userState";

export default function LoginForm() {
  const history = useHistory();
  const [loginState, setLoginState] = useRecoilState(userState);
  const loginHandler = async (useremail, password) => {
    try {
      const result = await obtainToken(useremail, password);
      const data = result.data;
      if (data) {
        window.alert("로그인에 성공!");
        setLoginState({
          isLogin: true,
          name: data.name,
        });
        history.push("/");
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };
  return <PLoginForm loginHandler={loginHandler} />;
}
