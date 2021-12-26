import React from "react";

import { FeedCategory } from "../../../../constants";
import * as S from "../../style";

export default function CategoryLabel({ category, setCategory }) {
  const onClick = (name) => {
    const copy = { ...category };
    copy.category = name;
    setCategory(copy);
  };
  return (
    <>
      <p style={{ color: "#989898", padding: "0.3em" }}>
        분야 : {category.category === "ALL" ? "전체" : category.category}
      </p>
      <S.CategoryBox>
        <div>
          <S.CategoryBtn
            disabled={category.category === "ALL" ? true : false}
            onClick={() => onClick("ALL")}
          >
            전체
          </S.CategoryBtn>
          {FeedCategory.map((a) => (
            <S.CategoryBtn
              key={a.id}
              disabled={category.category === a.name ? true : false}
              onClick={() => onClick(a.name)}
            >
              {a.name}
            </S.CategoryBtn>
          ))}
        </div>
      </S.CategoryBox>
    </>
  );
}
