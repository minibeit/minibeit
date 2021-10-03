import React from "react";
import BProfileFeed from "../../Common/FeedBox/BProfileFeed";
import Paging from "../../Common/Pagination";

import * as S from "../style";

export default function PBReviewBox({
  reviewlist,
  handlepage,
  paging,
  page,
  count,
}) {
  return (
    <>
      {reviewlist.length > 0 ? (
        <>
          {reviewlist.map((reviewEle) => (
            <BProfileFeed
              key={reviewEle.id}
              state="review"
              feedInfo={reviewEle}
            />
          ))}
          <Paging page={page} count={count} setPage={handlepage} />
        </>
      ) : (
        <S.IfNoneWordCont>
          <p>아직 후기가 작성되지 않았습니다.</p>
        </S.IfNoneWordCont>
      )}
    </>
  );
}
