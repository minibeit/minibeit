import React, { useCallback, useEffect, useState } from "react";

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
import { useHistory } from "react-router";

export default function ApplyComponent({ page }) {
  const history = useHistory();
  const user = useRecoilValue(userState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [school, setSchool] = useRecoilState(schoolState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [date, setDate] = useRecoilState(dateState);
  const [feedList, setFeedList] = useState();
  const [totalElements, setTotalElements] = useState(0);

  const search = useCallback(
    (schoolId, page) => {
      feedlistApi(page, schoolId, date, filter, category, user.isLogin)
        .then((res) => {
          setFeedList(res.data.data.content);
          setTotalElements(res.data.data.totalElements);
          history.push(`/apply?${page}`);
        })
        .catch((err) => console.log(err));
    },
    [user.isLogin, category, date, filter, history]
  );

  const postBookmark = (postId) => {
    bookmarkApi(postId)
      .then()
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (page) search(school.schoolId, page);
  }, [search, page, school.schoolId]);

  return (
    <S.ListPageContainer>
      <SearchBar
        school={school}
        setSchool={setSchool}
        date={date}
        setDate={setDate}
        search={search}
      />
      {feedList && (
        <>
          <Filter
            feedList={feedList}
            filter={filter}
            setFilter={setFilter}
            category={category}
            setCategory={setCategory}
          />
          <S.SearchResult>검색결과 {totalElements}건</S.SearchResult>
        </>
      )}

      {feedList && (
        <>
          <ListContainer feedList={feedList} postBookmark={postBookmark} />
          {feedList.length !== 0 && (
            <Pagination
              page={page}
              count={totalElements}
              onChange={(e) => history.push(`/apply?${e}`)}
            />
          )}
        </>
      )}
    </S.ListPageContainer>
  );
}
