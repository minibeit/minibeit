import React from "react";
import { ReactComponent as Star } from "../../../svg/별.svg";
import CreateAuthModal from "../../Common/Modal/CreateAuthModal";

import * as S from "../style";

export default function Presenter({
  feedList,
  goToDetailPage,
  clickBookmark,
  modalSwitch,
  setModalSwitch,
}) {
  return (
    <S.ListContainer>
      {feedList.length !== 0 ? (
        feedList.map((a) => {
          return (
            <S.FeedBox key={a.id}>
              <S.FeedHeader isLike={a.isLike}>
                <div>
                  <p id={a.id} onClick={goToDetailPage}>
                    {a.title}
                  </p>
                  <p>{a.businessProfileName}</p>
                </div>
                <S.FeedLikeBox isLike={a.isLike}>
                  <Star onClick={() => clickBookmark(a)} />
                  <p>{a.likes}</p>
                </S.FeedLikeBox>
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
      {modalSwitch && <CreateAuthModal setModalSwitch={setModalSwitch} />}
    </S.ListContainer>
  );
}
