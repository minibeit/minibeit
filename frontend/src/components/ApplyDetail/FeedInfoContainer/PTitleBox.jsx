import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
        <Link to={`/business/${businessProfileInfo.id}`}>
          <HomeIcon />
          <p>{businessProfileInfo.name}</p>
        </Link>
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
