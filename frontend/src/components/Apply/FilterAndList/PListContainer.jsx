import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import * as S from "../style";

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
};

export default function PListContainer({ feedList }) {
  const history = useHistory();
  const goToDetailPage = (e) => {
    history.push(`/apply/${e.target.id}`);
  };
  console.log(feedList);
  return (
    <>
      {feedList.map((a) => {
        return (
          <S.FeedBox key={a.id}>
            <S.FeedTitle id={a.id} onClick={goToDetailPage}>
              {a.title}
            </S.FeedTitle>
            <S.FeedDoTime>소요시간: {a.doTime}분</S.FeedDoTime>
            {a.payment === "CACHE" ? (
              <S.FeedPay>보상: {a.cache}원</S.FeedPay>
            ) : (
              <S.FeedPay>보상: 상품</S.FeedPay>
            )}
          </S.FeedBox>
        );
      })}
    </>
  );
}
