import React, { useCallback, useState } from "react";

import { bookmarkApi, feedlistApi } from "../../utils/feedApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import {
  categoryState,
  dateState,
  filterState,
  schoolState,
} from "../../recoil/filterState";
import { Pagination } from "../Common";

import Filter from "./Filter";
import SearchBar from "./SearchBar";
import ListContainer from "./ListContainer";

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
      <Filter
        feedList={feedList}
        search={search}
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
      />
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
