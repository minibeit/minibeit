import React from "react";
import PropTypes from "prop-types";
import PTimeSelectBox from "./PTimeSelectBox";
import PReveiwBox from "./PReviewBox";
import { PVImg } from "../../Common";

import * as S from "../style";

PFeedInfoContainer.propTypes = {
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
export default function PFeedInfoContainer({ feedDetailData, date }) {
  const {
    id,
    businessProfileInfo,
    startDate,
    endDate,
    content,
    payment,
    paymentDetail,
    cache,
    goods,
    place,
    contact,
    files,
    recruitCondition,
    recruitConditionDetail,
  } = feedDetailData;

  return (
    <div>
      <S.DataBox>
        <PTimeSelectBox
          feedId={id}
          date={date}
          startDate={startDate}
          endDate={endDate}
        />
      </S.DataBox>
      <S.DataBox>
        {files.length === 0 ? (
          <p>파일없음</p>
        ) : (
          <p>파일있는데 아직 구현 안됨</p>
        )}
        <S.DataTitle>상세내용</S.DataTitle>
        <p>{content}</p>
      </S.DataBox>
      <S.DataBox>
        <S.DataTitle>지원조건</S.DataTitle>
        {recruitCondition ? (
          recruitConditionDetail.map((a, i) => (
            <S.Condition key={i}>{a}</S.Condition>
          ))
        ) : (
          <p>누구나 지원가능!</p>
        )}
      </S.DataBox>
      <S.DataBox>
        <S.DataTitle>지급방식 및 상세내용</S.DataTitle>
        <p>금액 : {payment === "CACHE" ? `${cache}원` : goods}</p>
        <p>지급 : {paymentDetail}</p>
      </S.DataBox>
      <S.DataBox>
        <S.DataTitle>참여 장소 및 연락처</S.DataTitle>
        <p>주소 : {place}</p>
        <p>연락처 : {contact}</p>
      </S.DataBox>
      <S.DataBox>
        <S.DataTitle>모집자 정보</S.DataTitle>
        <S.BusinessInfoBox>
          <S.ImgBox>
            {businessProfileInfo.avatar ? (
              <PVImg img={businessProfileInfo.avatar} />
            ) : (
              <S.Img src="/기본비즈니스프로필.jpeg" />
            )}
          </S.ImgBox>
          <h3>{businessProfileInfo.name}</h3>
        </S.BusinessInfoBox>
      </S.DataBox>
      <S.DataBox>
        <S.DataTitle>실험실 후기</S.DataTitle>
        <PReveiwBox businessId={businessProfileInfo.id} />
      </S.DataBox>
    </div>
  );
}
