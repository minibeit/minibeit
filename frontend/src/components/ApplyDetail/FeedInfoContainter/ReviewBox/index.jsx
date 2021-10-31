import React, { useEffect, useState, useCallback } from "react";
import { reviewListGetApi } from "../../../../utils";
import Presenter from "./presenter";

export default function ReveiwBox({ businessId }) {
  const [page, setPage] = useState(1);
  const [reviewList, setReviewList] = useState([]);
  const [totalReview, setTotalReview] = useState(0);

  const getReview = useCallback(() => {
    reviewListGetApi(businessId, 1, 3).then((res) => {
      setReviewList(res.data.data.content);
      setTotalReview(res.data.data.numberOfElements);
    });
  }, [businessId]);

  useEffect(() => {
    getReview();
  }, [getReview]);

  return (
    <Presenter
      reviewList={reviewList}
      page={page}
      setPage={setPage}
      totalReview={totalReview}
    />
  );
}
