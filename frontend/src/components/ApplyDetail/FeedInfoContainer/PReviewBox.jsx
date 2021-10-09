import React, { useEffect, useState, useCallback } from "react";
import { reviewListGetApi } from "../../../utils";
import { Pagination } from "../../Common";

import * as S from "../style";

export default function PReveiwBox({ businessId }) {
  const [page, setPage] = useState(1);
  const [reviewList, setReviewList] = useState([]);
  const [totalReview, setTotalReview] = useState(0);

  const getReview = useCallback(() => {
    reviewListGetApi(businessId, 1, 3).then((res) => {
      setReviewList(res.data.content);
      setTotalReview(res.data.numberOfElements);
    });
  }, [businessId]);

  useEffect(() => {
    getReview();
  }, [getReview]);
  return (
    <S.ReviewBox>
      {reviewList.length !== 0 ? (
        reviewList.map((a) => (
          <div key={a.id}>
            <p>이름</p>
            <p>{a.doDate}</p>
            <p>{a.content}</p>
          </div>
        ))
      ) : (
        <p>리뷰 없음</p>
      )}
      <Pagination page={page} count={totalReview} setPage={setPage} />
    </S.ReviewBox>
  );
}