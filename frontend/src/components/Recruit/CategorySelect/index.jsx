import React, { useState } from "react";
import FeedCategory from "../../../constants/FeedCategory";

import * as S from "../style";

export default function DataSelect({ recruit, setRecruit, movePage }) {
  const [category, setCategory] = useState(null);

  return (
    <S.Page>
      <S.DataSelectContainer>
        <S.DataSelectHeader>
          <p>카테고리를 선택해주세요</p>
        </S.DataSelectHeader>
        <S.CategoryContainer>
          <div>
            {FeedCategory.map((a) => {
              return (
                <S.CategoryBtn
                  id={a.id}
                  key={a.id}
                  onClick={() => setCategory(a.name)}
                  disabled={category === a.name ? true : false}
                >
                  {a.icon}
                  {a.name}
                </S.CategoryBtn>
              );
            })}
            <S.CategoryBtn style={{ opacity: 0, zIndex: -10 }} />
          </div>
          <S.SaveBtn
            disabled={category === null ? true : false}
            onClick={() => {
              const copy = { ...recruit };
              copy["category"] = category;
              setRecruit(copy);
              movePage(3);
            }}
          >
            확인
          </S.SaveBtn>
        </S.CategoryContainer>
      </S.DataSelectContainer>
    </S.Page>
  );
}
