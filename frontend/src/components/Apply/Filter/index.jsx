import React from "react";

import DetailFilter from "./DetailFilter";
import FilterLabel from "./FilterLabel";
import CategoryLabel from "./CategoryLabel";

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
      <div>
        {feedList && (
          <DetailFilter
            filter={filter}
            setFilter={setFilter}
            filterReset={filterReset}
          />
        )}
        <FilterLabel filter={filter} setFilter={setFilter} />
      </div>
      <CategoryLabel category={category} setCategory={setCategory} />
    </>
  );
}
