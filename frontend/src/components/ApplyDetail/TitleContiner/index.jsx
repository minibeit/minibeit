import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
        <p>{title}</p>
        <div>
          <HomeIcon />
          <p>{businessProfileInfo.name}</p>
        </div>
      </S.TitleContent>
      <S.TitleBookMark>
        {isLogin ? (
          <StarBorderIcon
            id={id}
            onClick={clickBookmark}
            style={{ color: `${isLike ? "rgb(6, 66, 255)" : ""}` }}
          />
        ) : (
          <StarBorderIcon />
        )}
        <p>{likes}</p>
      </S.TitleBookMark>
    </S.TitleBox>
  );
}
