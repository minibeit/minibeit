import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import { userState } from "../../recoil/userState";

import BProfileList from "./BProfileList";
import BProfileMain from "./BProfileMain";
import BProfileFeedList from "./BProfileFeedList";
import BProfileInfo from "./BProfileInfo";
import BProfileReviewList from "./BProfileReviewList";

import * as S from "./style";

export default function BProfileComponent({ businessId }) {
  const [tabIndex, setTabIndex] = useState(1);
  const nickname = useRecoilValue(userState).name;
  const link = "/user/" + nickname;
  return (
    <>
      <S.BTabCont>
        <Link to={link}>
          {" "}
          <S.ProfileTab1>개인 프로필</S.ProfileTab1>
        </Link>
        <S.ProfileTab2>비즈니스 프로필</S.ProfileTab2>
      </S.BTabCont>
      <S.BTabContent>
        {businessId === 0 ? (
          <BProfileMain />
        ) : (
          <S.TabBox>
            <>
              <S.BPLeftCont>
                <BProfileInfo businessId={businessId} />
              </S.BPLeftCont>
              <S.BPRightCont>
                <BProfileList businessId={businessId} />
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
                  <BProfileFeedList
                    businessId={businessId}
                    state="new"
                    status="RECRUIT"
                  />
                ) : tabIndex === 2 ? (
                  <BProfileFeedList
                    businessId={businessId}
                    state="finish"
                    status="COMPLETE"
                  />
                ) : tabIndex === 3 ? (
                  <BProfileReviewList businessId={businessId} />
                ) : null}
              </S.BPRightCont>
            </>
          </S.TabBox>
        )}
      </S.BTabContent>
    </>
  );
}
