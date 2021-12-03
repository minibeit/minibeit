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
                {a.id === 1 && (
                  <>
                    <div>아이콘</div>
                    <p>시간</p>
                  </>
                )}
                {a.id === 2 && (
                  <>
                    <div>아이콘</div>
                    <p>흥미</p>
                  </>
                )}
                {a.id === 3 && (
                  <>
                    <div>아이콘</div>
                    <p>보상</p>
                  </>
                )}
                {a.id === 4 && (
                  <>
                    <div>아이콘</div>
                    <p>친절</p>
                  </>
                )}
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
