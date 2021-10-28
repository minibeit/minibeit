import React, { useCallback, useState } from "react";
import PSearchFilter from "./PSearchFilter";
import PListContainer from "./PListContainer";
import PDetailFilter from "./PDetailFilter";
import PCategoryFilter from "./PCategoryFilter";
import { Pagination } from "../../Common";
import { bookmarkApi, feedlistApi } from "../../../utils/feedApi";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../../recoil/userState";
import {
  categoryState,
  dateState,
  filterState,
} from "../../../recoil/filterState";

import * as S from "../style";

export default function FilterAndList() {
  const user = useRecoilValue(userState);
  const [filter, setFilter] = useRecoilState(filterState);
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
          setFeedList(res.data.content);
          setTotalElements(res.data.totalElements);
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

  const search = (e) => {
    if (typeof e === "number") {
      if (filter.schoolId) {
        getFeedList(e, filter.schoolId, date, filter, category);
      } else if (user.schoolId) {
        getFeedList(e, user.schoolId, date, filter, category);
      } else {
        alert("학교를 선택해주세요");
      }
    } else {
      if (filter.schoolId) {
        getFeedList(page, filter.schoolId, date, filter, category);
      } else if (user.schoolId) {
        getFeedList(page, user.schoolId, date, filter, category);
      } else {
        alert("학교를 선택해주세요");
      }
    }
  };

  return (
    <S.ListPageContainer>
      <PSearchFilter
        feedList={feedList}
        search={search}
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
      />
      <div>
        {feedList && <button onClick={clickDetailFilter}>상세필터</button>}
        {feedList && <button onClick={clickCategoryFilter}>실험분야</button>}
      </div>
      {filterSwitch && (
        <PDetailFilter
          filter={filter}
          setFilter={setFilter}
          setFilterSwitch={setFilterSwitch}
          filterReset={filterReset}
          search={search}
        />
      )}
      {categorySwitch && (
        <PCategoryFilter
          category={category}
          setCategory={setCategory}
          setCategorySwitch={setCategorySwitch}
          categoryReset={categoryReset}
          search={search}
        />
      )}
      {feedList && (
        <>
          <PListContainer feedList={feedList} postBookmark={postBookmark} />
          <Pagination
            page={page}
            count={totalElements}
            setPage={setPage}
            onChange={search}
          />
        </>
      )}
    </S.ListPageContainer>
  );
}
