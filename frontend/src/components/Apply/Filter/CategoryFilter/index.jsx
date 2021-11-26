import React from "react";
import { FeedCategory } from "../../../../constants";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "../../style";

export default function CategoryFilter({
  category,
  setCategory,
  setCategorySwitch,
  categoryReset,
  search,
}) {
  const clickCategory = (value) => {
    const copy = { ...category };
    copy.category = value;
    setCategory(copy);
  };

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
