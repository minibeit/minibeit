import React from "react";

import DetailFilter from "./DetailFilter";
import FilterLabel from "./FilterLabel";
import CategoryLabel from "./CategoryLabel";
import * as S from "../style";

export default function Filter({
  feedList,
  filter,
  setFilter,
  category,
  setCategory,
}) {
  const filterReset = () => {
    const copy = { ...filter };
    copy.paymentType = "";
    copy.minPay = "";
    setFilter(copy);
  };
  return (
    <>
      <S.ConditionsBox>
        {feedList && (
          <DetailFilter
            filter={filter}
            setFilter={setFilter}
            filterReset={filterReset}
          />
        )}
        <FilterLabel filter={filter} setFilter={setFilter} />
      </S.ConditionsBox>
      <CategoryLabel category={category} setCategory={setCategory} />
    </>
  );
}
