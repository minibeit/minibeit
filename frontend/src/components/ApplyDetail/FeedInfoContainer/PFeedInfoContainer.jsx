import React from "react";
import PropTypes from "prop-types";
import PTimeSelectBox from "./PTimeSelectBox";
import PReveiwBox from "./PReviewBox";
import { PVImg } from "../../Common";

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
  postBookmark: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};
export default function PFeedInfoContainer({
  setModalSwitch,
  feedDetailData,
  date,
  postBookmark,
  isLogin,
}) {
  const {
    id,
    businessProfileInfo,
    title,
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
    isLike,
    likes,
    recruitCondition,
    recruitConditionDetail,
  } = feedDetailData;

  const apply = useRecoilValue(applyState);
  const openModal = () => {
    setModalSwitch(true);
  };
  const clickBookmark = (e) => {
    postBookmark(e.target.id);
    if (e.target.textContent === "북마크 중") {
      e.target.textContent = "북마크";
      e.target.nextSibling.textContent =
        parseInt(e.target.nextSibling.textContent) - 1;
    } else {
      e.target.textContent = "북마크 중";
      e.target.nextSibling.textContent =
        parseInt(e.target.nextSibling.textContent) + 1;
    }
  };

  return (
    <S.DetailContainer>
      <S.TitleBox>
        <h3>{title}</h3>
        <p>{businessProfileInfo.name}</p>
        {isLogin ? (
          <button id={id} onClick={clickBookmark}>
            {isLike ? "북마크 중" : "북마크"}
          </button>
        ) : null}
        <p>{likes}</p>
      </S.TitleBox>
      <S.DateInfoBox>
        <PTimeSelectBox
          feedId={id}
          date={date}
          startDate={startDate}
          endDate={endDate}
        />
      </S.DateInfoBox>
      <S.DataBox>
        {files.length === 0 ? (
          <p>파일없음</p>
        ) : (
          <p>파일있는데 아직 구현 안됨</p>
        )}
        <h4>상세내용</h4>
        <p>{content}</p>
      </S.DataBox>
      <S.DataBox>
        <h4>지원조건</h4>
        {recruitCondition ? (
          recruitConditionDetail.map((a, i) => <p key={i}>- {a}</p>)
        ) : (
          <p>누구나 지원가능!</p>
        )}
      </S.DataBox>
      <S.DataBox>
        <h4>지급방식 및 상세내용</h4>
        <p>금액 : {payment === "CACHE" ? `${cache}원` : goods}</p>
        <p>지급 : {paymentDetail}</p>
      </S.DataBox>
      <S.DataBox>
        <h4>참여 장소 및 연락처</h4>
        <p>주소 : {place}</p>
        <p>연락처 : {contact}</p>
      </S.DataBox>
      <S.DataBox>
        <h4>모집자 정보</h4>
        <S.ImgBox>
          {businessProfileInfo.avatar ? (
            <PVImg img={businessProfileInfo.avatar} />
          ) : (
            <S.Img src="/기본비즈니스프로필.jpeg" />
          )}
        </S.ImgBox>
        <h5>{businessProfileInfo.name}</h5>
      </S.DataBox>
      <S.DataBox>
        <h4>실험실 후기</h4>
        <PReveiwBox businessId={businessProfileInfo.id} />
      </S.DataBox>
      <S.DataBox>
        <p>날짜: {apply.doDate}</p>
        <p>시간: {apply.doTime}</p>
        {payment === "CACHE" ? <p>보상: {cache}원</p> : <p>보상: {goods}</p>}
        <button onClick={openModal}>지원하기</button>
        <button>공유하기</button>
      </S.DataBox>
    </S.DetailContainer>
  );
}
