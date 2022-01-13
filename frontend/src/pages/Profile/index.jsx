import React from "react";
import { useLocation } from "react-router";
import ProfileComponent from "../../components/Profile";

import * as S from "../style";

export default function Profile() {
  const location = useLocation();
  const queryArr = location.search.split("&");
  const view = queryArr[0].slice(1);
  const page = parseInt(queryArr[1]);

  return (
    <S.ProfileBackGround>
      <ProfileComponent view={view} page={page} />
    </S.ProfileBackGround>
  );
}
