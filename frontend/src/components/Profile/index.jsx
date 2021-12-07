import React from "react";

import UserContainer from "./UserContainer";
import BusinessContainer from "./BusinessContainer";

import * as S from "./style";
import { useHistory } from "react-router";

export default function ProfileComponent({ view }) {
  const history = useHistory();
  return (
    <S.ProfilePage>
      <div>
        <S.ModeSelectBtn
          onClick={() => history.push("/profile?approve")}
          disabled={view !== "business" ? true : false}
        >
          개인 프로필
        </S.ModeSelectBtn>
        <S.ModeSelectBtn
          onClick={() => history.push("/profile?business")}
          disabled={view === "business" ? true : false}
        >
          비즈니스 프로필
        </S.ModeSelectBtn>
        {view === "business" ? (
          <BusinessContainer />
        ) : (
          <UserContainer view={view} />
        )}
      </div>
    </S.ProfilePage>
  );
}
