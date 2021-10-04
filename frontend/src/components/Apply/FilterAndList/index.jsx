import React, { useCallback, useEffect, useState } from "react";
import PFilterContainer from "./PFilterContainer";
import PListContainer from "./PListContainer";
import { Pagination } from "../../Common";
import { bookmarkApi, feedlistApi } from "../../../utils/feedApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import {
  categoryState,
  dateState,
  filterState,
} from "../../../recoil/filterState";

export default function FilterAndList() {
  const user = useRecoilValue(userState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [date, setDate] = useRecoilState(dateState);
  const [feedList, setFeedList] = useState();
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

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

  const search = () => {
    if (filter.schoolId) {
      getFeedList(page, filter.schoolId, date, filter, category);
    } else if (user.schoolId) {
      getFeedList(page, user.schoolId, date, filter, category);
    } else {
      alert("학교를 선택해주세요");
    }
  };
  useEffect(() => {
    getFeedList(page, filter.schoolId, date, filter, category);
  }, [category, filter, date, getFeedList, page]);

  return (
    <>
      <PFilterContainer
        search={search}
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
      />
      {feedList ? (
        <PListContainer feedList={feedList} postBookmark={postBookmark} />
      ) : null}
      <Pagination page={page} count={totalElements} setPage={setPage} />
    </>
  );
}
