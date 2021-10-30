import React from "react";

import FeedCategory from "../../../constants/FeedCategory";

import * as S from "../style";

export default function Presenter({ onClick, recruit, movePage }) {
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
