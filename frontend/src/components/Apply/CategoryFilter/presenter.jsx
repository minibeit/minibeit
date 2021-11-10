import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FeedCategory } from "../../../constants";

import * as S from "../style";

export default function Presenter({
  category,
  categoryReset,
  setCategorySwitch,
  search,
  clickCategory,
}) {
  return (
    <S.FilterBox>
      <div
        onClick={() => {
          categoryReset();
          setCategorySwitch(false);
        }}
      >
        <CloseIcon />
      </div>
      <S.DetailBox>
        <S.SelectBtn
          disabled={category["category"] === "ALL" ? true : false}
          onClick={() => clickCategory("ALL")}
        >
          전체
        </S.SelectBtn>
        {FeedCategory.map((a) => {
          return (
            <S.SelectBtn
              key={a.id}
              disabled={category["category"] === `${a.name}` ? true : false}
              onClick={() => clickCategory(a.name)}
            >
              {a.icon}
              {a.name}
            </S.SelectBtn>
          );
        })}
      </S.DetailBox>
      <S.FilterSaveBtn
        onClick={() => {
          search(1);
          setCategorySwitch(false);
        }}
      >
        카테고리 적용하기
      </S.FilterSaveBtn>
    </S.FilterBox>
  );
}
