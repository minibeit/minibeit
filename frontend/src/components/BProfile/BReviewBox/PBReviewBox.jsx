import React from "react";
import BProfileFeed from "../../Common/FeedBox/BProfileFeed";

import * as S from "../style";

export default function PBReviewBox({ reviewlist }) {
  return (
    <>
      <S.BoxTitle>신청한 목록</S.BoxTitle>
      {reviewlist.length > 0 ? (
        reviewlist.map((reviewEle) => (
          <BProfileFeed
            key={reviewEle.id}
            state="review"
            feedInfo={reviewEle}
          />
        ))
      ) : (
        <S.IfNoneWordCont>
          <p>아직 후기가 작성되지 않았습니다.</p>
        </S.IfNoneWordCont>
      )}
    </>
  );
}
