import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import * as S from "../style";
import { useRecoilValue } from "recoil";
import { filterState } from "../../../recoil/filterState";

PListContainer.propTypes = {
  feedList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cache: PropTypes.number,
      doTime: PropTypes.number.isRequired,
      goods: PropTypes.string,
      payment: PropTypes.string.isRequired,
      recruitCondition: PropTypes.bool.isRequired,
      recruitConditionDetail: PropTypes.string,
      startTime: PropTypes.array,
    })
  ),
  postBookmark: PropTypes.func.isRequired,
};

export default function PListContainer({ feedList, postBookmark }) {
  const filter = useRecoilValue(filterState);
  const history = useHistory();
  const goToDetailPage = (e) => {
    history.push(
      `/apply/${e.target.id}?${filter.date.getFullYear()}-${
        filter.date.getMonth() + 1 < 10
          ? "0" + (filter.date.getMonth() + 1)
          : filter.date.getMonth() + 1
      }-${
        filter.date.getDate() < 10
          ? "0" + filter.date.getDate()
          : filter.date.getDate()
      }`
    );
  };

  const clickBookmark = (e) => {
    postBookmark(e.target.id);
    if (e.target.textContent === "북마크 중") {
      e.target.textContent = "북마크";
    } else {
      e.target.textContent = "북마크 중";
    }
  };

  return (
    <>
      {feedList.length !== 0 ? (
        feedList.map((a) => {
          return (
            <S.FeedBox key={a.id}>
              <S.FeedTitle id={a.id} onClick={goToDetailPage}>
                {a.title}
              </S.FeedTitle>
              <button id={a.id} onClick={clickBookmark}>
                {a.like ? "북마크 중" : "북마크"}
              </button>

              <S.FeedAuthor>{a.businessProfileName}</S.FeedAuthor>
              <S.FeedInfoData>
                <S.DataItem>소요시간: {a.doTime}분</S.DataItem>
                {a.payment === "CACHE" ? (
                  <S.DataItem>지급: {a.cache}원</S.DataItem>
                ) : (
                  <S.DataItem>지급: 상품</S.DataItem>
                )}
                <S.DataItem>
                  필수조건: {a.recruitCondition ? "있음" : "없음"}
                </S.DataItem>
              </S.FeedInfoData>
            </S.FeedBox>
          );
        })
      ) : (
        <p>실험이 없습니다</p>
      )}
    </>
  );
}
