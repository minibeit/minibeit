import axios from "axios";
import React, { useState } from "react";
import * as S from "../style";

function PLoginForm({ loginHandler }) {
  return (
    <S.FormContainer>
      <S.LoginButton
        type="submit"
        onClick={async () => {
          const id = "1867487118";
          await loginHandler(id);
          window.location.replace("/signupInfo");
        }}
      >
        로그인
      </S.LoginButton>
    </S.FormContainer>
  );
}
export default PLoginForm;
