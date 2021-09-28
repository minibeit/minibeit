import React, { useState } from "react";

import * as S from "../style";

export default function PCategorySelect({ recruit, setRecruit }) {
  const [categoryArr] = useState([
    "경영/마케팅",
    "IT/모바일",
    "디자인",
    "체육",
    "음악",
    "교육",
    "건설",
    "미디어/사회",
    "인지/심리",
    "의료/헬스케어",
    "모빌리티",
    "경제",
    "정치",
    "생활/문화",
    "패션/뷰티",
    "식품",
    "종교",
    "제조/공업",
    "기타",
  ]);

  const onClick = (e) => {
    const copy = { ...recruit };
    copy["category"] = e.target.textContent;
    setRecruit(copy);
  };

  return (
    <>
      <h2>카테고리</h2>
      <p>모집하는 실험의 카테고리를 골라보세요.</p>
      {categoryArr.map((a, i) => {
        return (
          <S.CategoryBtn
            id={i}
            key={i}
            onClick={onClick}
            disabled={recruit.category === a ? true : false}
          >
            {a}
          </S.CategoryBtn>
        );
      })}
      <button>확인</button>
    </>
  );
}
