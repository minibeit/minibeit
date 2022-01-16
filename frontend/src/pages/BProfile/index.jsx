import React from "react";
import { useLocation } from "react-router-dom";
import BProfileComponent from "../../components/BProfile";

import * as S from "../style";

export default function BProfile({ match }) {
  const { businessId } = match.params;
  const location = useLocation();
  const queryArr = location.search.split("&");
  const view = queryArr[0].slice(1);
  const page = parseInt(queryArr[1]);

  return (
    <S.ProfileBackGround>
      <BProfileComponent
        businessId={parseInt(businessId)}
        view={view}
        page={page}
      />
    </S.ProfileBackGround>
  );
}
