import React, { useEffect, useState } from "react";
import { useResetRecoilState } from "recoil";
import { ReactComponent as FilterIcon } from "../../../svg/필터.svg";

import { categoryState, filterState } from "../../../recoil/filterState";

import DetailFilter from "./DetailFilter";
import CategoryFilter from "./CategoryFilter";
import FilterLabel from "./FilterLabel";

export default function Filter({
  feedList,
  search,
  filter,
  setFilter,
  category,
  setCategory,
}) {
  const [filterSwitch, setFilterSwitch] = useState(false);
  const [categorySwitch, setCategorySwitch] = useState(false);
  const filterReset = useResetRecoilState(filterState);
  const categoryReset = useResetRecoilState(categoryState);

  const clickDetailFilter = () => {
    setFilterSwitch(!filterSwitch);
    setCategorySwitch(false);
  };

  const clickCategoryFilter = () => {
    setCategorySwitch(!categorySwitch);
    setFilterSwitch(false);
  };
  useEffect(() => {
    search(1);
  }, [search]);
  return (
    <>
      <div>
        {feedList && (
          <button onClick={clickDetailFilter}>
            <FilterIcon />
            상세필터
          </button>
        )}
        {feedList && <button onClick={clickCategoryFilter}>실험분야</button>}
      </div>
      {filterSwitch && (
        <DetailFilter
          filter={filter}
          setFilter={setFilter}
          setFilterSwitch={setFilterSwitch}
          filterReset={filterReset}
          search={search}
        />
      )}
      {categorySwitch && (
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          setCategorySwitch={setCategorySwitch}
          categoryReset={categoryReset}
          search={search}
        />
      )}
      <FilterLabel
        category={category}
        setCategory={setCategory}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
}
