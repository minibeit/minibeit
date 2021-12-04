import React from "react";
import { Link } from "react-router-dom";
import { ExplainContent, ExplainTitle } from "../../components/ExplainPage";
import * as S from "./style";

export default function ExplainPage() {
  return (
    <>
      <ExplainTitle />
      <ExplainContent />
      <S.ExplainBtn>
        <Link to="/feedList">
          <p>시작하기</p>
        </Link>
      </S.ExplainBtn>
    </>
  );
}
