import React from "react";
import { ReactComponent as Star } from "../../../svg/별.svg";
import { ReactComponent as Home } from "../../../svg/홈.svg";
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
                <div>
                  <S.FeedBookmark onClick={(e) => clickBookmark(a, e)}>
                    <Star />
                    <p>{a.likes}</p>
                  </S.FeedBookmark>
                </div>
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
              {/* <div>
                <img
                  alt="썸네일"
                  src={a.file ? a.file.url : "/images/기본프로필.png"}
                />
                <div>
                  <div onClick={(e) => clickBookmark(a, e)}>
                    <Star />
                    <p>{a.likes}</p>
                  </div>
                </div>
              </div>
              <div>
                <S.FeedHeader isLike={a.isLike}>
                  <p>{a.title}</p>
                  <div>
                    <Home />
                    <p>{a.businessProfileName}</p>
                  </div>
                </S.FeedHeader>
                <S.FeedInfoData
                  payment={a.payment}
                  condition={a.recruitCondition}
                >
                  <p>소요시간: {a.doTime}분</p>
                  <div>참여조건 {a.recruitCondition ? "있음" : "없음"}</div>
                  {a.payment === "CACHE" ? (
                    <div>
                      <span>현금</span> {a.cache}원
                    </div>
                  ) : (
                    <div>
                      <span>물품</span> {a.goods}
                    </div>
                  )}
                </S.FeedInfoData>
              </div> */}
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
