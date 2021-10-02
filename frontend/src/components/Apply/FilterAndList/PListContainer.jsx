import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

import * as S from "../style";
import { useRecoilValue } from "recoil";
import { dateState } from "../../../recoil/filterState";

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
  const date = useRecoilValue(dateState).date;
  const history = useHistory();
  const goToDetailPage = (e) => {
    history.push(`/apply/${e.target.id}?${moment(date).format("YYYY-MM-DD")}`);
  };

  const clickBookmark = (e) => {
    postBookmark(e.target.id, e.target.value);
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
              {a.like !== true ? (
                <button id={a.id} value="post" onClick={clickBookmark}>
                  북마크
                </button>
              ) : (
                <button id={a.id} value="delete" onClick={clickBookmark}>
                  북마크 중
                </button>
              )}

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
