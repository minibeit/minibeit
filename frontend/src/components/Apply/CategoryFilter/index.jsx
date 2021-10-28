import React from "react";

import Presenter from "./presenter";

export default function CategoryFilter({
  category,
  setCategory,
  setCategorySwitch,
  categoryReset,
  search,
}) {
  const clickCategory = (value) => {
    const copy = { ...category };
    copy.category = value;
    setCategory(copy);
  };

  return (
    <Presenter
      category={category}
      categoryReset={categoryReset}
      setCategorySwitch={setCategorySwitch}
      search={search}
      clickCategory={clickCategory}
    />
  );
}
