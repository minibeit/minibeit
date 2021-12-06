import React from "react";
import { ReactComponent as HomeIcon } from "../../../svg/홈.svg";
import { ReactComponent as Star } from "../../../svg/별.svg";

import * as S from "../style";

export default function TitleContainer({
  title,
  businessProfileInfo,
  clickBookmark,
  category,
  id,
  likes,
  isLike,
}) {
  return (
    <S.TitleBox>
      <S.TitleContent>
        <p>{category}</p>
        <div>
          <p>{title}</p>
          <S.TitleBookMark isLike={isLike}>
            <Star id={id} onClick={clickBookmark} />
            <p>{likes}</p>
          </S.TitleBookMark>
        </div>
        <div>
          <HomeIcon />
          <p>{businessProfileInfo.name}</p>
        </div>
      </S.TitleContent>
    </S.TitleBox>
  );
}
