import React, { useState } from "react";

import UserContainer from "./UserContainer";
import BusinessContainer from "./BusinessContainer";

import * as S from "./style";

export default function ProfileComponent({ userId }) {
  const [mode, setMode] = useState("user");
  return (
    <S.ProfilePage>
      <div>
        <S.ModeSelectBtn
          onClick={() => setMode("user")}
          disabled={mode === "user" ? true : false}
        >
          개인 프로필
        </S.ModeSelectBtn>
        <S.ModeSelectBtn
          onClick={() => setMode("business")}
          disabled={mode === "business" ? true : false}
        >
          비즈니스 프로필
        </S.ModeSelectBtn>
        {mode === "user" ? <UserContainer /> : <BusinessContainer />}
      </div>
    </S.ProfilePage>
  );
}
