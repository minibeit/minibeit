import React from "react";
import RecruitCompleteComponent from "../../components/RecruitComplete";

import * as S from "../style";

export default function RecruitComplete({ match }) {
  const postId = match.params.postId;
  return (
    <S.BackGround>
      <RecruitCompleteComponent postId={postId} />
    </S.BackGround>
  );
}
