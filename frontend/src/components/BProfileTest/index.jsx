import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";

import BProfileInfo from "./BProfileInfo";
import BProfileList from "./BProfileList";
import BProfileFeedList from "./BProfileFeedList";

import * as S from "./style";

export default function BProfileComponent({ businessId }) {
  const history = useHistory();
  const userId = useRecoilValue(userState).name;

  return (
    <S.ProfilePage>
      <div>
        <S.ModeSelectBtn onClick={() => history.push(`/profile/${userId}`)}>
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
