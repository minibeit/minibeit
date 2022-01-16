import React from "react";
import MainComponent from "../../components/Main";
import SignUpComponent from "../../components/SignUp";

import * as S from "../style";

export default function SignUP() {
  return (
    <S.BackGround>
      <MainComponent />
      <SignUpComponent />
    </S.BackGround>
  );
}
