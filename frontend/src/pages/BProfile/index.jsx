import React from "react";
import BProfileComponent from "../../components/BProfile";

import * as S from "../style";

export default function BProfile({ match }) {
  const { businessId } = match.params;
  return (
    <S.ProfileBackGround>
      <BProfileComponent businessId={parseInt(businessId)} />
    </S.ProfileBackGround>
  );
}
