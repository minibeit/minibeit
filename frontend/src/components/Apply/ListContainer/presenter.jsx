import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import * as S from "../style";

export default function Presenter({
  feedList,
  goToDetailPage,
  user,
  clickBookmark,
}) {
  return (
    <S.ListContainer>
      {feedList.length !== 0 ? (
        feedList.map((a) => {
          return (
            <S.FeedBox key={a.id}>
              <S.FeedHeader>
                <div>
                  <p id={a.id} onClick={goToDetailPage}>
                    {a.title}
                  </p>
                  <p>{a.businessProfileName}</p>
                </div>
                <div>
                  {user.isLogin ? (
                    <StarBorderIcon
                      id={a.id}
                      onClick={clickBookmark}
                      style={{ color: `${a.isLike ? "rgb(6, 66, 255)" : ""}` }}
                    />
                  ) : (
                    <StarBorderIcon />
                  )}
                  <p>{a.likes}</p>
                </div>
              </S.FeedHeader>
              <S.FeedInfoData>
                <p>소요시간: {a.doTime}분</p>
                {a.payment === "CACHE" ? (
                  <p>지급: {a.cache}원</p>
                ) : (
                  <p>지급: 상품</p>
                )}
                <p>필수조건: {a.recruitCondition ? "있음" : "없음"}</p>
              </S.FeedInfoData>
            </S.FeedBox>
          );
        })
      ) : (
        <p>실험이 없습니다</p>
      )}
    </S.ListContainer>
  );
}