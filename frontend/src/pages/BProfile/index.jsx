import React from "react";

import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import BProfileSection from "../../components/BProfile/BProfileSection";
import { NavBar } from "../../components/Common";
import { userState } from "../../recoil/userState";
import * as S from "./style";
import { BprofileContainer } from "../../components/BProfile";

export default function BProfile({ match }) {
  const { businessId } = match.params;
  const nickname = useRecoilValue(userState).name;
  const link = "/user/" + nickname;
  return (
    <>
      <NavBar />
      <Link to={link}>
        {" "}
        <S.ProfileTab1>개인 프로필</S.ProfileTab1>
      </Link>
      <S.ProfileTab2>비즈니스 프로필</S.ProfileTab2>
      {businessId === "0" ? (
        <BProfileSection />
      ) : (
        <>
          <BprofileContainer businessId={parseInt(businessId)} />
        </>
      )}
    </>
  );
}
