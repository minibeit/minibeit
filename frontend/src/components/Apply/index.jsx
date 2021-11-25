import React, { useCallback, useState } from "react";

import { bookmarkApi, feedlistApi } from "../../utils/feedApi";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/userState";
import {
  categoryState,
  dateState,
  filterState,
  schoolState,
} from "../../recoil/filterState";
import { Pagination } from "../Common";
import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as FilterIcon } from "../../svg/필터.svg";

import SearchBar from "./SearchBar";
import ListContainer from "./ListContainer";
import DetailFilter from "./DetailFilter";
import CategoryFilter from "./CategoryFilter";

import * as S from "./style";

export default function ApplyComponent() {
  const user = useRecoilValue(userState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [school, setSchool] = useRecoilState(schoolState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [date, setDate] = useRecoilState(dateState);
  const [feedList, setFeedList] = useState();
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [filterSwitch, setFilterSwitch] = useState(false);
  const [categorySwitch, setCategorySwitch] = useState(false);

  const filterReset = useResetRecoilState(filterState);
  const categoryReset = useResetRecoilState(categoryState);

  const getFeedList = useCallback(
    async (page, schoolId, date, filter, category) => {
      await feedlistApi(page, schoolId, date, filter, category, user.isLogin)
        .then((res) => {
          setFeedList(res.data.data.content);
          setTotalElements(res.data.data.totalElements);
        })
        .catch((err) => console.log(err));
    },
    [user.isLogin]
  );

  const postBookmark = async (postId) => {
    await bookmarkApi(postId)
      .then()
      .catch((err) => console.log(err));
  };

  const clickDetailFilter = () => {
    setFilterSwitch(!filterSwitch);
    setCategorySwitch(false);
  };
  const clickCategoryFilter = () => {
    setCategorySwitch(!categorySwitch);
    setFilterSwitch(false);
  };

  const closeLabel = (e) => {
    var target =
      e.target.nodeName === "svg"
        ? e.target.parentNode
        : e.target.parentNode.parentNode;
    const { name } = target;

    if (name === "startAndEnd") {
      const copy = { ...filter };
      copy[name] = [0, 24];
      copy.startTime = "00:00";
      copy.endTime = "24:00";
      setFilter(copy);
    } else if (name === "category") {
      const copy = { ...category };
      copy.category = "ALL";
      setCategory(copy);
    } else {
      const copy = { ...filter };
      copy[name] = "";
      setFilter(copy);
    }
  };

  const search = useCallback(
    (e) => {
      if (typeof e === "number") {
        setPage(e);
        if (school.schoolId) {
          getFeedList(e, school.schoolId, date, filter, category);
        } else if (user.schoolId) {
          getFeedList(e, user.schoolId, date, filter, category);
        } else {
          alert("학교를 선택해주세요");
        }
      } else {
        if (school.schoolId) {
          getFeedList(page, school.schoolId, date, filter, category);
        } else if (user.schoolId) {
          getFeedList(page, user.schoolId, date, filter, category);
        } else {
          alert("학교를 선택해주세요");
        }
      }
    },
    [category, date, filter, getFeedList, page, school.schoolId, user.schoolId]
  );

  return (
    <S.ListPageContainer>
      <SearchBar
        feedList={feedList}
        search={search}
        filter={filter}
        setFilter={setFilter}
        school={school}
        setSchool={setSchool}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
      />
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

      <S.FilterLabelBox>
        <p>선택한 필터 : </p>
        {filter.paymentType !== "" && (
          <S.FilterLabel>
            <p>보상방식 : {filter.paymentType === "CACHE" ? "현금" : "물품"}</p>
            <button name="paymentType" onClick={closeLabel}>
              <CloseIcon disabled />
            </button>
          </S.FilterLabel>
        )}
        {filter.minPay !== "" && (
          <S.FilterLabel>
            <p>
              보상금액 : {filter.minPay === "9999" && "1만원 미만"}
              {filter.minPay === "10000" && "1만원 이상"}
              {filter.minPay === "30000" && "3만원 이상"}
              {filter.minPay === "50000" && "5만원 이상"}
            </p>
            <button name="minPay" onClick={closeLabel}>
              <CloseIcon />
            </button>
          </S.FilterLabel>
        )}
        {filter.doTime !== "" && (
          <S.FilterLabel>
            <p>
              소요시간 : {filter.doTime === "30" && "30분 이내"}
              {filter.doTime === "60" && "1시간 이내"}
              {filter.doTime === "180" && "3시간 이내"}
              {filter.doTime === "181" && "3시간 이상"}
            </p>
            <button name="doTime" onClick={closeLabel}>
              <CloseIcon />
            </button>
          </S.FilterLabel>
        )}
        {(filter.startAndEnd[0] !== 0 || filter.startAndEnd[1] !== 24) && (
          <S.FilterLabel>
            <p>
              시작시간 : {filter.startAndEnd[0]}시 - {filter.startAndEnd[1]}시
            </p>
            <button name="startAndEnd" onClick={closeLabel}>
              <CloseIcon />
            </button>
          </S.FilterLabel>
        )}
        {category.category !== "ALL" && (
          <S.FilterLabel>
            <p>{category.category}</p>
            <button name="category" onClick={closeLabel}>
              <CloseIcon disabled />
            </button>
          </S.FilterLabel>
        )}
      </S.FilterLabelBox>
      <p>검색결과 {totalElements}건</p>
      {feedList && (
        <>
          <ListContainer feedList={feedList} postBookmark={postBookmark} />
          {feedList.length !== 0 && (
            <Pagination
              page={page}
              count={totalElements}
              setPage={setPage}
              onChange={search}
            />
          )}
        </>
      )}
    </S.ListPageContainer>
  );
}
