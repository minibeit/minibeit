import React from "react";
import { useHistory } from "react-router";

import BProfileInfo from "./BProfileInfo";
import BProfileFeedList from "./BProfileFeedList";

import * as S from "./style";

export default function BProfileComponent({ businessId }) {
  const history = useHistory();

  return (
    <div>
      <S.ModeSelectBtn onClick={() => history.push("/profile?approve")}>
        개인 프로필
      </S.ModeSelectBtn>
      <S.ModeSelectBtn disabled={true}>비즈니스 프로필</S.ModeSelectBtn>
      <S.Container>
        <BProfileInfo businessId={businessId} />
        <S.FeedContainer>
          <BProfileFeedList businessId={businessId} />
        </S.FeedContainer>
      </S.Container>
    </div>
  );
}
