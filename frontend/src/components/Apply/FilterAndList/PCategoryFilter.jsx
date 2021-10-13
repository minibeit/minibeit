import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { FeedCategory } from "../../../constants";

import * as S from "../style";

PCategoryFilter.propTypes = {
  category: PropTypes.object.isRequired,
  setCategory: PropTypes.func.isRequired,
  setCategorySwitch: PropTypes.func.isRequired,
  categoryReset: PropTypes.func.isRequired,
};

export default function PCategoryFilter({
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
          search();
          setCategorySwitch(false);
        }}
      >
        카테고리 적용하기
      </S.FilterSaveBtn>
    </S.FilterBox>
  );
}
