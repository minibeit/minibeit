import React, { useState } from "react";
import { useHistory } from "react-router";
import { FeedCategory } from "../../../../constants";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "../../style";

export default function CategoryFilter({
  category,
  setCategory,
  setCategorySwitch,
  categoryReset,
}) {
  const history = useHistory();
  const [data, setData] = useState(category);

  const clickCategory = (value) => {
    const copy = { ...data };
    copy.category = value;
    setData(copy);
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
          disabled={data["category"] === "ALL" ? true : false}
          onClick={() => clickCategory("ALL")}
        >
          전체
        </S.SelectBtn>
        {FeedCategory.map((a) => {
          return (
            <S.SelectBtn
              key={a.id}
              disabled={data["category"] === `${a.name}` ? true : false}
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
          setCategory({ ...data });
          setCategorySwitch(false);
          history.push("/apply?1");
        }}
      >
        카테고리 적용하기
      </S.FilterSaveBtn>
    </S.FilterBox>
  );
}
