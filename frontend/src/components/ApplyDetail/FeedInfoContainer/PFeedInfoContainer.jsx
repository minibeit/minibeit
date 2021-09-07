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
  }),
};

export default function PFeedInfoContainer({ feedDetailData }) {
  const {
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
      <S.DetailTitle>제목: {title}</S.DetailTitle>
      <S.DetailContent>소요시간: {doTime}</S.DetailContent>
      <S.DetailContent>
        기간: {startDate}~{endDate}
      </S.DetailContent>
      <S.DetailContent>세부사항: {content}</S.DetailContent>
      {payment === "CACHE" ? (
        <S.DetailContent>보상: {cache}</S.DetailContent>
      ) : (
        <S.DetailContent>보상: {goods}</S.DetailContent>
      )}
      <S.DetailContent>학교: {schoolName}</S.DetailContent>
      <S.DetailContent>장소: {place}</S.DetailContent>
      <S.DetailContent>contact: {contact}</S.DetailContent>
      <S.DetailContent>
        조건: {recruitCondition ? `${recruitConditionDetail}` : "없음"}
      </S.DetailContent>
      {files.length === 0 ? <p>파일없음</p> : <p>파일있는데 아직 구현 안됨</p>}
    </S.DetailContainer>
  );
}
