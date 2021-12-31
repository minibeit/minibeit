import React from "react";
import { ReactComponent as UserIcon } from "../../../../svg/유저.svg";

import * as S from "../../style";

export default function BProfileReview({ feedData, reviewCount }) {
  return (
    <>
      <S.ReviewImgBox></S.ReviewImgBox>
      <S.ReviewBar>
        {reviewCount === 0 ? (
          <p>등록된 리뷰가 없습니다</p>
        ) : (
          <>
            {feedData.map((a) => (
              <S.ReviewItem
                width={`${parseInt((a.count / reviewCount) * 100)}%`}
              >
                <div />
                <S.ReviewInfo view={a.count === 0 && "none"}>
                  <p>
                    {a.id === 1 && "시간"}
                    {a.id === 2 && "흥미"}
                    {a.id === 3 && "보상"}
                    {a.id === 4 && "친절"}
                  </p>
                  <p>{`${parseInt((a.count / reviewCount) * 100)}%`}</p>
                </S.ReviewInfo>
              </S.ReviewItem>
            ))}
          </>
        )}
      </S.ReviewBar>
      <div style={{ width: "100%" }}>
        {feedData.map((a) => {
          return (
            <S.ReviewList key={a.id}>
              <S.ReviewTitle>
                {a.id === 1 && <p>시간</p>}
                {a.id === 2 && <p>흥미</p>}
                {a.id === 3 && <p>보상</p>}
                {a.id === 4 && <p>친절</p>}
              </S.ReviewTitle>
              <p>{a.content}</p>
              <S.ReviewCount>
                <UserIcon />
                <p>{a.count}</p>
              </S.ReviewCount>
            </S.ReviewList>
          );
        })}
      </div>
    </>
  );
}
