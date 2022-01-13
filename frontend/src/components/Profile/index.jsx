import React from "react";

import UserContainer from "./UserContainer";
import UserLikeContainer from "./UserLikeContainer";
import BusinessContainer from "./BusinessContainer";

import * as S from "./style";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";

export default function ProfileComponent({ view, page }) {
  const history = useHistory();
  const usersBProfile = useRecoilValue(userState).bprofile;

  return (
    <div>
      <S.ModeSelectBtn
        onClick={() => history.push("/profile?approve&1")}
        disabled={view !== "business" ? true : false}
      >
        개인 프로필
      </S.ModeSelectBtn>
      <S.ModeSelectBtn
        onClick={() => {
          if (usersBProfile) {
            history.push(`/business/${usersBProfile}?created&1`);
          } else {
            history.push("/profile?business");
          }
        }}
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
              <UserContainer view={view} page={page} />
            )}
          </>
        )}
      </S.Container>
    </div>
  );
}
