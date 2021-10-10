import React, { useState } from "react";
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
export default function PFeedInfoContainer({
  feedDetailData,
  date,
  editDetail,
}) {
  const {
    id,
    businessProfileInfo,
    startDate,
    endDate,
    content,
    payment,
    paymentDetail,
    cache,
    isMine,
    goods,
    place,
    contact,
    files,
    recruitCondition,
    recruitConditionDetail,
    updatedContent,
  } = feedDetailData;
  const [editSwitch, setEditSwitch] = useState(false);
  const [newContent, setNewContent] = useState(
    updatedContent ? updatedContent : content
  );

  const editSubmit = () => {
    editDetail(id, newContent);
    setEditSwitch(false);
  };

  return (
    <div>
      <S.DataBox>
        <S.DataHeader>
          <p>참여날짜 및 시간 선택하기</p>
        </S.DataHeader>
        <S.DataBody>
          <PTimeSelectBox
            feedId={id}
            date={date}
            startDate={startDate}
            endDate={endDate}
          />
        </S.DataBody>
      </S.DataBox>
      <S.DataBox>
        <S.DataBody>
          {feedDetailData && files.map((a, i) => <S.Img key={i} src={a.url} />)}
        </S.DataBody>
      </S.DataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>상세내용</p>
          {isMine && editSwitch === false && (
            <button onClick={() => setEditSwitch(!editSwitch)}>수정하기</button>
          )}
        </S.DataHeader>
        <S.DataBody>
          {editSwitch ? (
            <div>
              <S.EditTextArea
                defaultValue={updatedContent ? updatedContent : content}
                onChange={(e) => {
                  setNewContent(e.target.value);
                }}
              />
              <button onClick={editSubmit}>수정완료</button>
            </div>
          ) : (
            <S.DetailContent>
              {updatedContent ? <p>{updatedContent}</p> : <p>{content}</p>}
            </S.DetailContent>
          )}
        </S.DataBody>
      </S.DataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>지원조건</p>
        </S.DataHeader>
        <S.DataBody>
          {recruitCondition ? (
            recruitConditionDetail.map((a, i) => (
              <S.Condition key={i}>{a}</S.Condition>
            ))
          ) : (
            <p>누구나 지원가능!</p>
          )}
        </S.DataBody>
      </S.DataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>지급방식 및 상세내용</p>
        </S.DataHeader>
        <S.DataBody>
          <p>금액 : {payment === "CACHE" ? `${cache}원` : goods}</p>
          <p>지급 : {paymentDetail}</p>
        </S.DataBody>
      </S.DataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>참여 장소 및 연락처</p>
        </S.DataHeader>
        <S.DataBody>
          <p>주소 : {place}</p>
          <p>연락처 : {contact}</p>
        </S.DataBody>
      </S.DataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>모집자 정보</p>
        </S.DataHeader>
        <S.DataBody>
          <S.BusinessInfoBox>
            <S.BussinessImgBox>
              {businessProfileInfo.avatar ? (
                <PVImg img={businessProfileInfo.avatar} />
              ) : (
                <S.Img src="/기본비즈니스프로필.jpeg" />
              )}
            </S.BussinessImgBox>
            <h3>{businessProfileInfo.name}</h3>
          </S.BusinessInfoBox>
        </S.DataBody>
      </S.DataBox>
      <S.DataBox>
        <S.DataHeader>
          <p>실험실 후기</p>
        </S.DataHeader>
        <S.DataBody>
          <PReveiwBox businessId={businessProfileInfo.id} />
        </S.DataBody>
      </S.DataBox>
    </div>
  );
}
