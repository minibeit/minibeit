import React from "react";
import BOtherProfile from "../BOtherProfile";
import BProfileInfo from "../BProfileInfo";
import BReviewBox from "../BReviewBox";
import * as S from "../style";

export default function BProfileContainer({ businessId }) {
  return (
    <>
      <S.BPLeftCont>
        <BProfileInfo businessId={businessId} />
      </S.BPLeftCont>
      <S.BPRightCont>
        <BOtherProfile businessId={businessId} />
        <div>생성한 실험리스트</div>
        <BReviewBox businessId={businessId} />
      </S.BPRightCont>
    </>
  );
}
