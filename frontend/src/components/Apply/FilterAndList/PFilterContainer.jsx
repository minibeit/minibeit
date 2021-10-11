import React, { useState } from "react";
import { useResetRecoilState } from "recoil";
import { categoryState, filterState } from "../../../recoil/filterState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes, { number } from "prop-types";

import DetailFilter from "./PDetailFilter";
import CategoryFilter from "./PCategoryFilter";
import SchoolSelect from "../../Common/SchoolSelect";

import * as S from "../style";

PFilterContainer.propTypes = {
  getFeedList: PropTypes.func,
  search: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    schoolId: PropTypes.number,
    schoolName: PropTypes.string,
    paymentType: PropTypes.string,
    minPay: PropTypes.string,
    doTime: PropTypes.string,
    startAndEnd: PropTypes.arrayOf(number),
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
  setFilter: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  setCategory: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired,
};

export default function PFilterContainer({
  search,
  filter,
  setFilter,
  category,
  setCategory,
  date,
  setDate,
}) {
  const [filterSwitch, setFilterSwitch] = useState(false);
  const [categorySwitch, setCategorySwitch] = useState(false);

  const filterReset = useResetRecoilState(filterState);
  const categoryReset = useResetRecoilState(categoryState);

  const clickDetailFilter = () => {
    setFilterSwitch(!filterSwitch);
    setCategorySwitch(false);
  };
  const clicCategoryFilter = () => {
    setCategorySwitch(!categorySwitch);
    setFilterSwitch(false);
  };

  return (
    <>
      <SchoolSelect />
      <DatePicker
        selected={date["date"]}
        onChange={(date) => {
          const copy = { ...date };
          copy.date = date;
          setDate(copy);
        }}
      />
      <S.SearchBtn onClick={search}>검색</S.SearchBtn>
      <br />
      <button onClick={clickDetailFilter}>상세필터</button>
      <button onClick={clicCategoryFilter}>실험분야</button>
      {filterSwitch && (
        <DetailFilter
          filter={filter}
          setFilter={setFilter}
          setFilterSwitch={setFilterSwitch}
          filterReset={filterReset}
        />
      )}
      {categorySwitch && (
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          setCategorySwitch={setCategorySwitch}
          categoryReset={categoryReset}
        />
      )}
    </>
  );
}
