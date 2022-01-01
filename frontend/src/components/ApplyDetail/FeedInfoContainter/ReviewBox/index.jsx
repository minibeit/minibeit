import React, { useCallback, useEffect, useState } from "react";

import { viewBusinessReviewApi } from "../../../../utils";
import { ReactComponent as UserIcon } from "../../../../svg/유저.svg";

import * as S from "../../style";

export default function ReveiwBox({ businessId }) {
  const [review, setReview] = useState();

  const getReview = useCallback(() => {
    viewBusinessReviewApi(businessId)
      .then((res) => {
        setReview(res.data.data);
      })
      .catch();
  }, [businessId]);

  useEffect(() => {
    getReview();
  }, [getReview]);

  return (
    <div>
      {review &&
        review.map((a) => {
          return (
            <S.ReviewItem key={a.id}>
              <S.ReviewTitle>
                <S.ReviewIcon id={a.id} />
                <p>
                  {a.id === 1 && "시간"}
                  {a.id === 2 && "흥미"}
                  {a.id === 3 && "보상"}
                  {a.id === 4 && "친절"}
                </p>
              </S.ReviewTitle>
              <p>{a.content}</p>
              <S.ReviewCount>
                <UserIcon />
                <p>{a.count}</p>
              </S.ReviewCount>
            </S.ReviewItem>
          );
        })}
    </div>
  );
}
