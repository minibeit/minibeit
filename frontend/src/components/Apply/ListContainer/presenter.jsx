import React from "react";
import { ReactComponent as Star } from "../../../svg/별.svg";
import { ReactComponent as Home } from "../../../svg/홈.svg";
import { ReactComponent as FillStar } from "../../../svg/fillStar.svg";
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
            <S.FeedBox key={a.id} onClick={() => goToDetailPage(a)}>
              <S.FeedImgView thumbnail={a.file && a.file.url}>
                <S.FeedBookmark
                  thumbnail={a.file && a.file.url}
                  onClick={(e) => clickBookmark(a, e)}
                >
                  {a.isLike ? <FillStar /> : <Star />}
                  <p>{a.likes}</p>
                </S.FeedBookmark>
              </S.FeedImgView>
              <S.FeedContentView>
                <S.FeedHeader isLike={a.isLike}>
                  <p>{a.title}</p>
                  <div>
                    <Home />
                    <p>{a.businessProfileName}</p>
                  </div>
                </S.FeedHeader>
                <S.FeedInfoData>
                  <div>소요시간: {a.doTime}분</div>
                  <S.RecruitTag recruit={a.recruitCondition}>
                    참여조건 {a.recruitCondition ? "있음" : "없음"}
                  </S.RecruitTag>
                  <S.PaymentBox payment={a.payment}>
                    {a.payment === "CACHE" ? (
                      <>
                        <span>현금</span> {a.cache}원
                      </>
                    ) : (
                      <>
                        <span>물품</span> {a.goods}
                      </>
                    )}
                  </S.PaymentBox>
                </S.FeedInfoData>
              </S.FeedContentView>
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
