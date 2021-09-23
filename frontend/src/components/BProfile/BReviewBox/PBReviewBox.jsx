import React from "react";
import BProfileFeed from "../../Common/FeedBox/BProfileFeed";

import * as S from "../style";

export default function PBReviewBox({ reviewlist, handlepage, paging }) {
  return (
    <>
      <S.BoxTitle>후기 모아보기</S.BoxTitle>
      {reviewlist.length > 0 ? (
        <>
          {reviewlist.map((reviewEle) => (
            <BProfileFeed
              key={reviewEle.id}
              state="review"
              feedInfo={reviewEle}
            />
          ))}
          <S.ListPaging>
            {paging.first ? null : (
              <p onClick={async () => await handlepage("PREV")}>이전</p>
            )}
            {paging.last ? null : (
              <p onClick={async () => await handlepage("NEXT")}>다음</p>
            )}
          </S.ListPaging>
        </>
      ) : (
        <S.IfNoneWordCont>
          <p>아직 후기가 작성되지 않았습니다.</p>
        </S.IfNoneWordCont>
      )}
    </>
  );
}
