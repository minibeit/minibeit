import React from "react";
import ApplyDetailComponent from "../../components/ApplyDetail";

import * as S from "../style";

function ApplyDetail({ match, location }) {
  const feedId = parseInt(match.params.postId);
  const date = location.search.slice(1);
  return (
    <S.DetailBackGround>
      <ApplyDetailComponent feedId={feedId} date={date} />
    </S.DetailBackGround>
  );
}
export default ApplyDetail;
