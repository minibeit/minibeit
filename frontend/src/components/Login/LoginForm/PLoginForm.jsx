import axios from "axios";
import React, { useState } from "react";
import * as S from "../style";

function PLoginForm({ loginHandler }) {
  return (
    <S.FormContainer>
      <S.LoginButton
        type="submit"
        onClick={() => {
          const id = "1867487118";
          loginHandler(id);
        }}
      >
        로그인
      </S.LoginButton>
    </S.FormContainer>
  );
}
export default PLoginForm;
