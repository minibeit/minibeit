import React from "react";
import { useHistory } from "react-router";

import BProfileInfo from "./BProfileInfo";
import BProfileList from "./BProfileList";
import BProfileFeedList from "./BProfileFeedList";

import * as S from "./style";

export default function BProfileComponent({ businessId }) {
  const history = useHistory();

  return (
    <S.ProfilePage>
      <div>
        <S.ModeSelectBtn onClick={() => history.push("/profile")}>
          개인 프로필
        </S.ModeSelectBtn>
        <S.ModeSelectBtn disabled={true}>비즈니스 프로필</S.ModeSelectBtn>
        <S.Container>
          <BProfileInfo businessId={businessId} />
          <S.FeedContainer>
            <BProfileList businessId={businessId} />
            <BProfileFeedList businessId={businessId} />
          </S.FeedContainer>
        </S.Container>
      </div>
    </S.ProfilePage>
  );
}
