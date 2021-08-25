import React from "react";
import { useHistory } from "react-router";
import { obtainToken, signUpfunc } from "../../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";
import PSignupForm from "./PSignupForm";

export default function SignupForm() {
  const history = useHistory();
  const [loginState, setLoginState] = useRecoilState(userState);
  const signupHandler = async (username, useremail, password) => {
    try {
      const check = await signUpfunc(username, useremail, password);
      if (check) {
        const loginHandler = async (useremail, password) => {
          try {
            const result = await obtainToken(useremail, password);
            const data = result.data;
            if (data) {
              window.alert(" 회원가입에 성공!");
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
        await loginHandler(useremail, password);
      }
    } catch (e) {
      console.log(e.response.data.error.msg);
      alert(e.response.data.error.msg);
    }
  };
  return <PSignupForm signupHandler={signupHandler} />;
}
