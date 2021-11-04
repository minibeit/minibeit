import React, { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";

import BusinessContainer from "./BusinessContainer";

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
        <BusinessContainer businessId={businessId} />
      </div>
    </S.ProfilePage>
  );
}
