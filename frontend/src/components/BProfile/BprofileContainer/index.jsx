import React from "react";
import BMakeListBox from "../BMakeListBox";
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
        <BMakeListBox businessId={businessId} state="new" />
        <BMakeListBox businessId={businessId} state="finish" />
        <BReviewBox businessId={businessId} />
      </S.BPRightCont>
    </>
  );
}
