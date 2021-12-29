import React from "react";
import ApplyComponent from "../../components/Apply";

import * as S from "../style";

export default function Apply({ location }) {
  const page =
    location.search.slice(1) === "" ? null : parseInt(location.search.slice(1));
  return (
    <S.BackGround>
      <ApplyComponent page={page} />
    </S.BackGround>
  );
}
