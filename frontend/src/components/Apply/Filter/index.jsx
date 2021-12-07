import React from "react";
import { useResetRecoilState } from "recoil";

import { categoryState, filterState } from "../../../recoil/filterState";

import DetailFilter from "./DetailFilter";
import CategoryFilter from "./CategoryFilter";
import FilterLabel from "./FilterLabel";

export default function Filter({
  feedList,
  filter,
  setFilter,
  category,
  setCategory,
}) {
  const filterReset = useResetRecoilState(filterState);
  const categoryReset = useResetRecoilState(categoryState);

  return (
    <>
      <div>
        {feedList && (
          <DetailFilter
            filter={filter}
            setFilter={setFilter}
            filterReset={filterReset}
          />
        )}

        {feedList && (
          <CategoryFilter
            category={category}
            setCategory={setCategory}
            categoryReset={categoryReset}
          />
        )}
      </div>
      <FilterLabel
        category={category}
        setCategory={setCategory}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
}
