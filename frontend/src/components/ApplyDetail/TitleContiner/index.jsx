import React from "react";
import { ReactComponent as HomeIcon } from "../../../svg/홈.svg";
import { ReactComponent as Star } from "../../../svg/별.svg";

import * as S from "../style";

export default function TitleContainer({
  title,
  businessProfileInfo,
  clickBookmark,
  category,
  isLogin,
  id,
  isLike,
  likes,
}) {
  return (
    <S.TitleBox>
      <S.TitleContent>
        <p>{category}</p>
        <div>
          <p>{title}</p>
          <S.TitleBookMark>
            {isLogin ? (
              <Star
                id={id}
                onClick={clickBookmark}
                fill={isLike ? "rgb(6, 66, 255)" : ""}
                width="1.2rem"
                height="1.2rem"
              />
            ) : (
              <Star width="1.2rem" height="1.2rem" />
            )}
            <p>{likes}</p>
          </S.TitleBookMark>
        </div>
        <div>
          <HomeIcon width="1rem" height="1rem" />
          <p>{businessProfileInfo.name}</p>
        </div>
      </S.TitleContent>
    </S.TitleBox>
  );
}
