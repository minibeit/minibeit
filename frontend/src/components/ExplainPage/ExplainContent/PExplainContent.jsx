import React from "react";
import * as S from "../style";

function PExplainContent({ dummycontent }) {
  const { explain, src } = dummycontent;
  console.log(explain);
  console.log(src);
  return (
    <S.ExplainContentWrapper>
      <S.ExplainContentText>
        <p>{explain}</p>
      </S.ExplainContentText>
      <S.ExplainContentImg>
        <img src={src} alt="pic" />
      </S.ExplainContentImg>
    </S.ExplainContentWrapper>
  );
}
export default PExplainContent;
