import React from "react";
import PropTypes from "prop-types";

import FeedCategory from "../../../constants/FeedCategory";

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
    startDate: PropTypes.object,
    endDate: PropTypes.object,
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

export default function PCategorySelect({ movePage, recruit, setRecruit }) {
  const onClick = (name) => {
    const copy = { ...recruit };
    copy["category"] = name;
    setRecruit(copy);
  };

  return (
    <S.Page>
      <S.CategoryContainer>
        <p>카테고리</p>
        <p>모집하는 실험의 카테고리를 골라보세요.</p>
        <div>
          {FeedCategory.map((a) => {
            return (
              <S.CategoryBtn
                id={a.id}
                key={a.id}
                onClick={() => onClick(a.name)}
                disabled={recruit.category === a.name ? true : false}
              >
                {a.icon}
                {a.name}
              </S.CategoryBtn>
            );
          })}
        </div>
        <S.SaveBtn onClick={() => movePage(4)}>확인</S.SaveBtn>
      </S.CategoryContainer>
    </S.Page>
  );
}
