import React from "react";
import { useLocation } from "react-router";
import ProfileComponent from "../../components/Profile";

import * as S from "../style";

export default function Profile() {
  const location = useLocation();
  return (
    <S.ProfileBackGround>
      <ProfileComponent view={location.search.slice(1)} />
    </S.ProfileBackGround>
  );
}
