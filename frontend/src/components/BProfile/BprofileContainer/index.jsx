import React, { useState } from "react";
import BMakeListBox from "../BMakeListBox";
import BOtherProfile from "../BOtherProfile";
import BProfileInfo from "../BProfileInfo";
import BReviewBox from "../BReviewBox";
import * as S from "../style";

export default function BProfileContainer({ businessId }) {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <>
      <S.BPLeftCont>
        <BProfileInfo businessId={businessId} />
      </S.BPLeftCont>
      <S.BPRightCont>
        <BOtherProfile businessId={businessId} />
        <S.BPrightTab>
          <S.BPrightTabele tabIndex={tabIndex} index={1}>
            <p onClick={() => setTabIndex(1)}>생성한 실험 리스트</p>
          </S.BPrightTabele>
          <S.BPrightTabele tabIndex={tabIndex} index={2}>
            <p onClick={() => setTabIndex(2)}>완료한 실험 리스트</p>
          </S.BPrightTabele>
          <S.BPrightTabele tabIndex={tabIndex} index={3}>
            <p onClick={() => setTabIndex(3)}>후기 모아보기</p>
          </S.BPrightTabele>
        </S.BPrightTab>
        {tabIndex === 1 ? (
          <BMakeListBox businessId={businessId} state="new" status="RECRUIT" />
        ) : tabIndex === 2 ? (
          <BMakeListBox
            businessId={businessId}
            state="finish"
            status="COMPLETE"
          />
        ) : tabIndex === 3 ? (
          <BReviewBox businessId={businessId} />
        ) : null}
      </S.BPRightCont>
    </>
  );
}
