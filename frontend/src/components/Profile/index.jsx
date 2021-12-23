import React from "react";

import UserContainer from "./UserContainer";
import UserLikeContainer from "./UserLikeContainer";
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
        <S.Container>
          {view === "business" ? (
            <BusinessContainer />
          ) : (
            <>
              {view === "like" ? (
                <UserLikeContainer />
              ) : (
                <UserContainer view={view} />
              )}
            </>
          )}
        </S.Container>
      </div>
    </S.ProfilePage>
  );
}
