import React from "react";
import PropTypes from "prop-types";
import PTimeSelectBox from "./PTimeSelectBox";

import * as S from "../style";
import { useRecoilValue } from "recoil";
import { applyState } from "../../../recoil/applyState";

PFeedInfoContainer.propTypes = {
  setModalSwitch: PropTypes.func.isRequired,
  feedDetailData: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
      introduce: PropTypes.string,
    }),
  }),
  date: PropTypes.string,
};
export default function PFeedInfoContainer({
  setModalSwitch,
  feedDetailData,
  date,
}) {
  const {
    id,
    businessProfileInfo,
    title,
    startDate,
    endDate,
    content,
    payment,
    cache,
    goods,
    place,
    files,
    recruitCondition,
    recruitConditionDetail,
  } = feedDetailData;

  const apply = useRecoilValue(applyState);
  const openModal = () => {
    setModalSwitch(true);
  };

  return (
    <S.DetailContainer>
      <S.TitleBox>
        <h3>제목: {title}</h3>
        <p>작성자: {businessProfileInfo.name}</p>
      </S.TitleBox>
      <S.DateInfoBox>
        <PTimeSelectBox
          feedId={id}
          date={date}
          startDate={startDate}
          endDate={endDate}
        />
      </S.DateInfoBox>
      <S.ContentBox>
        <h4>상세모집요강</h4>
        <p>{content}</p>
      </S.ContentBox>
      <S.RecruitConditionBox>
        <h4>지원조건</h4>
        {recruitCondition ? (
          <p>{recruitConditionDetail}</p>
        ) : (
          <p>누구나 지원가능!</p>
        )}
      </S.RecruitConditionBox>
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
        <p>날짜: {apply.doDate}</p>
        <p>시간: {apply.doTime}</p>
        {payment === "CACHE" ? <p>보상: {cache}원</p> : <p>보상: {goods}</p>}
        <button onClick={openModal}>지원하기</button>
        <button>공유하기</button>
      </S.ApplyBox>
    </S.DetailContainer>
  );
}
