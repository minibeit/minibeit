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
  likes,
  isLike,
  likeToLogIn,
}) {
  return (
    <S.TitleBox>
      <S.TitleContent>
        <p>{category}</p>
        <div>
          <p>{title}</p>
          <S.TitleBookMark isLogin={isLogin} isLike={isLike}>
            {isLogin ? (
              <Star
                id={id}
                onClick={(e) => {
                  clickBookmark(e);
                }}
              />
            ) : (
              <Star onClick={likeToLogIn} />
            )}
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
