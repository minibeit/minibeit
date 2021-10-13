import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import * as S from "../style";

DetailFilter.propTypes = {
  category: PropTypes.object.isRequired,
  setCategory: PropTypes.func.isRequired,
  setCategorySwitch: PropTypes.func.isRequired,
  categoryReset: PropTypes.func.isRequired,
};

export default function DetailFilter({
  category,
  setCategory,
  setCategorySwitch,
  categoryReset,
  search,
}) {
  const clickCategory = (e) => {
    const value = e.target.textContent;
    const copy = { ...category };
    if (value === "전체") {
      copy.category = "";
    } else if (value.slice(2, value.length) === "") {
      copy.category = "기타";
    } else {
      copy.category = value.slice(2, value.length);
    }
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
          disabled={category["category"] === "" ? true : false}
          onClick={clickCategory}
        >
          전체
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "경영/마케팅" ? true : false}
          onClick={clickCategory}
        >
          📔경영/마케팅
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "IT/모바일" ? true : false}
          onClick={clickCategory}
        >
          🖥IT/모바일
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "디자인" ? true : false}
          onClick={clickCategory}
        >
          🎨디자인
        </S.SelectBtn>
        ️
        <S.SelectBtn
          disabled={category["category"] === "체육" ? true : false}
          onClick={clickCategory}
        >
          ⚽체육
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "음악" ? true : false}
          onClick={clickCategory}
        >
          🎶음악
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "교육" ? true : false}
          onClick={clickCategory}
        >
          📖교육
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "건설" ? true : false}
          onClick={clickCategory}
        >
          🔨건설
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "미디어/사회" ? true : false}
          onClick={clickCategory}
        >
          🎞미디어/사회
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "인지/심리" ? true : false}
          onClick={clickCategory}
        >
          🏥️인지/심리
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "의료/헬스케어" ? true : false}
          onClick={clickCategory}
        >
          💉의료/헬스케어
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "모빌리티" ? true : false}
          onClick={clickCategory}
        >
          🚘모빌리티
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "경제" ? true : false}
          onClick={clickCategory}
        >
          💰경제
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "정치" ? true : false}
          onClick={clickCategory}
        >
          🖌정치
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "생활/문화" ? true : false}
          onClick={clickCategory}
        >
          🍿생활/문화
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "패션/뷰티" ? true : false}
          onClick={clickCategory}
        >
          💄패션/뷰티
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "식품" ? true : false}
          onClick={clickCategory}
        >
          🍽식품
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "종교" ? true : false}
          onClick={clickCategory}
        >
          🙏종교
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "제조/공업" ? true : false}
          onClick={clickCategory}
        >
          🏭제조/공업
        </S.SelectBtn>
        <S.SelectBtn
          disabled={category["category"] === "기타" ? true : false}
          onClick={clickCategory}
        >
          기타
        </S.SelectBtn>
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
