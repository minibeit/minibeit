import React from "react";
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
      <button
        onClick={() => {
          categoryReset();
          setCategorySwitch(false);
        }}
      >
        닫기
      </button>
      <S.DetailBox>
        <button onClick={clickCategory}>전체</button>
        <button onClick={clickCategory}>📔경영/마케팅</button>
        <button onClick={clickCategory}>🖥IT/모바일</button>
        <button onClick={clickCategory}>🎨디자인</button>️
        <button onClick={clickCategory}>⚽체육</button>
        <button onClick={clickCategory}>🎶음악</button>
        <button onClick={clickCategory}>📖교육</button>
        <button onClick={clickCategory}>🔨건설</button>
        <button onClick={clickCategory}>🎞미디어/사회</button>
        <button onClick={clickCategory}>🏥️인지/심리</button>
        <button onClick={clickCategory}>💉의료/헬스케어</button>
        <button onClick={clickCategory}>🚘모빌리티</button>
        <button onClick={clickCategory}>💰경제</button>
        <button onClick={clickCategory}>🖌정치</button>
        <button onClick={clickCategory}>🍿생활/문화</button>
        <button onClick={clickCategory}>💄패션/뷰티</button>
        <button onClick={clickCategory}>🍽식품</button>
        <button onClick={clickCategory}>🙏종교</button>
        <button onClick={clickCategory}>🏭제조/공업</button>
        <button onClick={clickCategory}>기타</button>
      </S.DetailBox>
      <button onClick={() => setCategorySwitch(false)}>
        카테고리 적용하기
      </button>
    </S.FilterBox>
  );
}
