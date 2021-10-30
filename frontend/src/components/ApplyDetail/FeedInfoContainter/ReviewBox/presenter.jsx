import React from "react";
import { Pagination } from "../../../Common";

import * as S from "../../style";

export default function Presenter({ reviewList, page, setPage, totalReview }) {
  return (
    <>
      {reviewList.length !== 0 ? (
        reviewList.map((a) => (
          <S.ReviewBox key={a.id}>
            <div>
              <p>{a.writer}</p>
              <p>{a.doDate}</p>
            </div>
            <p>{a.content}</p>
          </S.ReviewBox>
        ))
      ) : (
        <p>리뷰 없음</p>
      )}
      {reviewList.length !== 0 && (
        <Pagination page={page} count={totalReview} setPage={setPage} />
      )}
    </>
  );
}
