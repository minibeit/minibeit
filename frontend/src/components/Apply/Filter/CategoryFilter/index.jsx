import React, { useState } from "react";
import { useHistory } from "react-router";
import { FeedCategory } from "../../../../constants";
import CloseIcon from "@mui/icons-material/Close";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import * as S from "../../style";

export default function CategoryFilter({
  category,
  setCategory,
  categoryReset,
}) {
  const history = useHistory();
  const [data, setData] = useState(category);
  const [categorySwitch, setCategorySwitch] = useState(false);

  const clickCategory = (value) => {
    const copy = { ...data };
    copy.category = value;
    setData(copy);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setCategorySwitch(false);
      }}
    >
      <div>
        <S.FilterBtn onClick={() => setCategorySwitch(true)}>
          실험분야
        </S.FilterBtn>
        {categorySwitch && (
          <S.FilterBox>
            <div
              onClick={() => {
                categoryReset();
                setCategorySwitch(false);
              }}
            >
              <p>관심분야</p>
              <CloseIcon />
            </div>
            <p>하나만 선택 가능합니다</p>
            <S.CategoryBox>
              <div>
                <S.CategoryBtn
                  disabled={data["category"] === "ALL" ? true : false}
                  onClick={() => clickCategory("ALL")}
                >
                  전체
                </S.CategoryBtn>
                {FeedCategory.map((a) => {
                  return (
                    <S.CategoryBtn
                      key={a.id}
                      disabled={data["category"] === `${a.name}` ? true : false}
                      onClick={() => clickCategory(a.name)}
                    >
                      {a.icon}
                      {a.name}
                    </S.CategoryBtn>
                  );
                })}
              </div>
            </S.CategoryBox>
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
        )}
      </div>
    </ClickAwayListener>
  );
}
