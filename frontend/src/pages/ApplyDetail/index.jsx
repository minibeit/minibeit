import React from "react";
import ApplyDetailComponent from "../../components/ApplyDetail";

import * as S from "../style";

function ApplyDetail({ match, location }) {
  const feedId = parseInt(match.params.postId);
  const date = location.search.slice(1);
  return (
    <S.BackGround>
      <ApplyDetailComponent feedId={feedId} date={date} />
    </S.BackGround>
  );
}
export default ApplyDetail;
