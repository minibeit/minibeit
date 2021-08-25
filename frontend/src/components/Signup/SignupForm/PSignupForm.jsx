import React, { useState } from "react";
import * as S from "../style";

function PSignupForm({ signupHandler }) {
  const [inputs, setInputs] = useState({
    username: "",
    useremail: "",
    password: "",
  });
  const { username, useremail, password } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(name, value);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <S.FormsignupContainer>
      <S.SignupInput
        value={username}
        name="username"
        type="text"
        placeholder="아이디"
        onChange={onChange}
      />
      <S.SignupInput
        value={useremail}
        name="useremail"
        type="email"
        placeholder="이메일"
        onChange={onChange}
      />
      <S.SignupInput
        value={password}
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={onChange}
      />

      <S.SignupButton
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await signupHandler(username, useremail, password);
        }}
      >
        회원가입
      </S.SignupButton>
    </S.FormsignupContainer>
  );
}
export default PSignupForm;
