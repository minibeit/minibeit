import React from "react";
import PropTypes from "prop-types";

import * as S from "../style";

PFeedInfoContainer.propTypes = {
  feedDetailData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    doTime: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    cache: PropTypes.number,
    goods: PropTypes.string,
    place: PropTypes.string.isRequired,
    schoolName: PropTypes.string.isRequired,
    contact: PropTypes.string,
    files: PropTypes.array,
    businessProfileInfo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      contact: PropTypes.string.isRequired,
      introduce: PropTypes.string.isRequired,
    }),
  }),
};

export default function PFeedInfoContainer({ feedDetailData }) {
  const {
    businessProfileInfo,
    title,
    doTime,
    startDate,
    endDate,
    content,
    payment,
    cache,
    goods,
    place,
    schoolName,
    contact,
    files,
    recruitCondition,
    recruitConditionDetail,
  } = feedDetailData;
  console.log(feedDetailData);
  return (
    <S.DetailContainer>
      <S.TitleBox>
        <h3>제목: {title}</h3>
        <p>작성자: {businessProfileInfo.name}</p>
        <button>북마크하기</button>
      </S.TitleBox>
      <S.DateInfoBox>
        <h4>실험 날짜 및 시간 선택</h4>
        <p>
          모집기간 : {startDate.slice(0, 10)}~{endDate.slice(0, 10)}
        </p>
      </S.DateInfoBox>
      <S.ContentBox>
        <h4>상세모집요강</h4>
        <p>{content}</p>
      </S.ContentBox>
      <S.RecuritConditionBox>
        <h4>지원조건</h4>
        {recruitCondition ? (
          <p>{recruitConditionDetail}</p>
        ) : (
          <p>누구나 지원가능!</p>
        )}
      </S.RecuritConditionBox>
      <S.PaymentBox>
        <h4>금액 및 지급 분류</h4>
        {payment === "CACHE" ? <p>보상: {cache}원</p> : <p>보상: {goods}</p>}
      </S.PaymentBox>
      <S.LocationBox>
        <h4>장소</h4>
        <p>{place}</p>
      </S.LocationBox>
      <S.BusinessProfileBox>
        <h4>연구실정보</h4>
        <h5>{businessProfileInfo.name}</h5>
        <p>주소: {businessProfileInfo.address}</p>
        <p>소개: {businessProfileInfo.introduce}</p>
      </S.BusinessProfileBox>
      {files.length === 0 ? <p>파일없음</p> : <p>파일있는데 아직 구현 안됨</p>}
      <S.ApplyBox>
        <p>날짜: </p>
        <p>시간: </p>
        {payment === "CACHE" ? <p>보상: {cache}원</p> : <p>보상: {goods}</p>}
        <button>지원하기</button>
        <button>공유하기</button>
      </S.ApplyBox>
    </S.DetailContainer>
  );
}
