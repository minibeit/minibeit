import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { categoryState, filterState } from "../../../recoil/filterState";
import { userState } from "../../../recoil/userState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

import DetailFilter from "./PDetailFilter";
import CategoryFilter from "./PCategoryFilter";

import * as S from "../style";
import { SchoolSearch } from "../../Common";

PFilterContainer.propTypes = {
  getFeedList: PropTypes.func.isRequired,
};

export default function PFilterContainer({ getFeedList }) {
  const [filter, setFilter] = useRecoilState(filterState);
  const [category, setCategory] = useRecoilState(categoryState);
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

  const search = () => {
    if (filter.schoolId) {
      getFeedList(1, filter.schoolId, filter.date, filter.payment);
    } else if (user.schoolId) {
      getFeedList(1, user.schoolId, filter.date, filter.payment);
    } else {
      alert("학교를 선택해주세요");
    }
  };

  const user = useRecoilValue(userState);

  return (
    <>
      <SchoolSearch use="ApplyList" />
      <DatePicker
        selected={filter["date"]}
        onChange={(date) => {
          const filter_cp = { ...filter };
          filter_cp["date"] = date;
          setFilter(filter_cp);
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
