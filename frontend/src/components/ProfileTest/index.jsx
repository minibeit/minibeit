import React, { useState } from "react";

import UserContainer from "./UserContainer";
import BusinessContainer from "./BusinessContainer";

import * as S from "./style";

export default function ProfileTestComponent({ userId }) {
  const [mode, setMode] = useState("user");
  return (
    <S.ProfilePage>
      <div>
        <button onClick={() => setMode("user")}>개인 프로필</button>
        <button onClick={() => setMode("business")}>비즈니스 프로필</button>
        {mode === "user" ? <UserContainer /> : <BusinessContainer />}
      </div>
    </S.ProfilePage>
  );
}
