import React, { useState } from "react";
import * as S from "../style";

function PLoginForm({ loginHandler }) {
  const [inputs, setInputs] = useState({
    useremail: "",
    password: "",
  });
  const { useremail, password } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(name, value);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <S.FormContainer>
      <S.LoginInput
        value={useremail}
        name="useremail"
        type="email"
        placeholder="이메일"
        onChange={onChange}
      />
      <S.LoginInput
        value={password}
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={onChange}
      />

      <S.LoginButton
        type="submit"
        onClick={async (e) => {
          e.preventDefault();
          await loginHandler(useremail, password);
        }}
      >
        로그인
      </S.LoginButton>
    </S.FormContainer>
  );
}
export default PLoginForm;
