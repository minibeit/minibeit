import React, { useState } from "react";
import PropTypes from "prop-types";

import * as S from "../style";

PCategorySelect.propTypes = {
  recruit: PropTypes.shape({
    businessProfile: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    school: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    headCount: PropTypes.number,
    doTime: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    timeList: PropTypes.arrayOf(PropTypes.string),
    dateList: PropTypes.arrayOf(PropTypes.string),
    exceptDateList: PropTypes.arrayOf(PropTypes.string),
    doDateList: PropTypes.arrayOf(
      PropTypes.shape({
        dodate: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    condition: PropTypes.bool,
    conditionDetail: PropTypes.array,
    payment: PropTypes.string,
    pay: PropTypes.string,
    payMemo: PropTypes.string,
    images: PropTypes.array,
    address: PropTypes.string,
    contact: PropTypes.string,
  }),
  setRecruit: PropTypes.func.isRequired,
};

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
