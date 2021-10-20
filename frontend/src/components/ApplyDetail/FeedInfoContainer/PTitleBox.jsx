import React from "react";
import HomeIcon from "@mui/icons-material/Home";

import * as S from "../style";

export default function PTitleBox({
  title,
  businessProfileInfo,
  clickBookmark,
  isLogin,
  id,
  isLike,
  likes,
}) {
  return (
    <S.TitleBox>
      <S.TitleContent>
        <p>카테고리</p>
        <p>{title}</p>
        <div>
          <HomeIcon />
          <p>{businessProfileInfo.name}</p>
        </div>
      </S.TitleContent>
      <S.TitleBookMark>
        {isLogin ? (
          <button id={id} onClick={clickBookmark}>
            {isLike ? "북마크 중" : "북마크"}
          </button>
        ) : null}
        <p>{likes}</p>
      </S.TitleBookMark>
    </S.TitleBox>
  );
}
